---
title: "cedar"
excerpt: "Secure your Express application APIs in 5 minutes with Cedar"
publishedAt: "2026-02-16"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

# Secure your Express application APIs in 5 minutes with Cedar

**Introduction**

Today, the open source Cedar project announced the release of [authorization-for-expressjs](https://github.com/awslabs/cedar-policy/tree/main/packages/authorization-for-expressjs), an open source package that simplifies using the Cedar policy language and authorization engine to verify application permissions. This release allows developers to add policy-based authorization to their Express web framework APIs within minutes, and without any remote service calls.

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This standardized integration with Cedar requires 90% less code compared to developers writing their own integration patterns, saving developers time and effort and improving application security posture by reducing the amount of custom integration code.

For example, if you are building a pet store application using the Express framework, using the `authorization-for-expressjs` feature you can create authorization policies so that only store employees can access the API to add a pet. This standardized implementation for Express authorization middleware replaces the need for custom code and automatically maps client requests into their principals, actions, and resources components, and then into Cedar authorization requests.

## Why Externalize Authorization with Cedar?

Traditionally, developers implemented authorization within their application by embedding authorization logic directly into application code. This embedded authorization logic is designed to support a few permissions, but as applications evolve, there is often a need to support more complex use cases with additional authorization requirements. Developers incrementally update the embedded authorization logic to support these complex use cases, resulting in code that is complex and difficult to maintain. As code complexity increases, further evolving the security model and performing audits of permissions becomes more challenging, resulting in an application that continuously becomes more difficult to maintain over its lifecycle.

Cedar allows you to decouple authorization logic from your application. Externalizing authorization from your application code yields multiple benefits including freeing up development teams to focus on application logic and simplifying application and resource access audits. Cedar is an open source language and software development kit (SDK) for writing and enforcing authorization policies for your applications. You specify fine-grained permissions as Cedar policies, and your application authorizes access requests by calling the Cedar SDK.

For example, you can use the below Cedar policy to permit employee users to call the `POST /pets` API in a sample PetStore application.

```cedar
permit(
    principal,
    action in [Action::"POST /pets"],
    resource
) when {
    principal.jobLevel = "employee"
};
```

One potential challenge in adopting Cedar can be the upfront effort required to define Cedar policies and update your application code to call the Cedar SDK to authorize API requests. This blog post shows how web application developers using the Express framework can easily implement API-level authorization with Cedar—adding just tens of lines of code in your applications, instead of hundreds. 

This step-by-step guide uses the sample PetStore application to show how access to API’s can be restricted based on user groups. You can find the sample Pet Store application in the [cedar-policy repository](https://github.com/awslabs/cedar-policy) on GitHub.

## Pet Store application API overview

The PetStore application is used to manage a pet store. The pet store is built using Express on Node.js and exposes the following API’s:

- `GET /pets` – returns a page of available pets in the PetStore.
- `POST /pets` – adds the specified pet to the PetStore.
- `GET /pets/{petId}` – returns the specified pet found in the PetStore.
- `POST /pets/{petId}/sale` – marks a pet as sold.

This application does not allow all users to access all APIs. Instead, it enforces the following rules:

- Both customer users and employees are allowed to perform read operations.
  - `GET /pets`
  - `GET /pets/{petId}`
- Only employees are allowed to perform write operations.
  - `POST /pets`
  - `POST /pets/{petId}/sale`

## Implementing authorization for the Pet Store APIs

Let’s walk through how to secure your application APIs using Cedar using the new package for Express. The initial application, with no authorization, can be found in the `start` folder; use this to follow along with the blog. You can find the completed application, with authorization added, in the `finish` folder.

### Add the Cedar Authorization Middleware package

The Cedar Authorization Middleware package will be used to generate a Cedar schema, create sample authorization policies, and perform the authorization in your application. Run this npm command to add the `@cedar-policy/authorization-for-expressjs` dependency to your application.

```bash
npm i --save @cedar-policy/authorization-for-expressjs
```

### Generate a Cedar Schema from your APIs

A Cedar schema defines the authorization model for an application, including the entities types in the application and the actions users are allowed to take. Your policies are validated against this schema when you run the application. The `authorization-for-expressjs` package can analyze the OpenAPI specification of your application and generate a Cedar schema. Specifically, the `paths` object is required in your specification.

**Note:** If you do not have an OpenAPI spec, you can generate one using the tool of your choice. There are a number of open source libraries to do this for Express; you may need to add some code to your application, generate the OpenAPI spec, and then remove the code. Alternatively, some generative AI-based tools such as the [Amazon Q Developer CLI](https://aws.amazon.com/amazon-q/) are effective at generating OpenAPI spec documents. Regardless of how you generate the spec, be sure to validate the correct output from the tool.

For the sample application, an OpenAPI spec document named `openapi.json` has been included. With an OpenAPI spec, you can generate a Cedar schema by running the `generateSchema` command listed here.

```bash
npx @cedar-policy/authorization-for-expressjs generate-schema --api-spec openapi.json --namespace PetStoreApp --mapping-type SimpleRest
```

The schema is stored in the `v4.cedarschema.json` file in the package root.

### Define authorization policies

If no policies are configured, Cedar denies all authorization requests. We will add policies that grant access to APIs only in authorized user groups. Run this command to generate sample Cedar policies. You can then customize these policies based on your use case.

```bash
npx @cedar-policy/authorization-for-expressjs generate-policies --schema v4.cedarschema.json
```

In the PetStore application, two sample policies are generated, `policy_1.cedar` and `policy_2.cedar`.

- `policy_1.cedar` provides permissions for users in the admin user group to perform any action on any resource.

```cedar
// policy_1.cedar
// Allows admin usergroup access to everything
permit(
    principal in PetStoreApp::UserGroup::"admin",
    action,
    resource
);
```

- `policy_2.cedar` provides more access to all the individual actions defined in the Cedar schema with a placeholder for a specific group.

```cedar
// policy_2.cedar
// Allows more granular user group control, change actions as needed
permit(
    principal in PetStoreApp::UserGroup::"ENTER_THE_USER_GROUP_HERE",
    action in [
        PetStoreApp::Action::"GET /pets",
        PetStoreApp::Action::"POST /pets",
        PetStoreApp::Action::"GET /pets/{petId}",
        PetStoreApp::Action::"POST /pets/{petId}/sale"
    ],
    resource
);
```

Note that if you specified an `operationId` in the OpenAPI specification, the action names defined in the Cedar Schema will use that `operationId` instead of the default “`<HTTP Method> /<PATH>`” format. In this case, ensure the naming of your Actions in your Cedar Policies matches the naming of your Actions in your Cedar Schema. For example, if you wish to call your action `addPet`, ensure that it is consistent across both the schema and the policy.

### Integrate Cedar with your Express application

Now that you have your Cedar schema and policies, you can integrate Cedar with your Express application. Here’s how you can do it:

1. **Import the Cedar middleware**:

    ```javascript
    const cedarMiddleware = require('@cedar-policy/authorization-for-expressjs');
    ```

2. **Initialize the Cedar middleware**:

    ```javascript
    const cedar = cedarMiddleware.create({
        schemaPath: 'v4.cedarschema.json',
        policyPaths: ['policy_1.cedar', 'policy_2.cedar']
    });
    ```

3. **Use the Cedar middleware in your Express app**:

    ```javascript
    const express = require('express');
    const app = express();

    app.use(cedar.middleware);

    // Your existing routes
    app.get('/pets', (req, res) => {
        res.send('List of pets');
    });

    app.post('/pets', (req, res) => {
        res.send('Pet added');
    });

    app.get('/pets/:petId', (req, res) => {
        res.send('Pet details');
    });

    app.post('/pets/:petId/sale', (req, res) => {
        res.send('Pet marked as sold');
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    ```

### Testing the authorization

To test the authorization, you can use tools like `curl` or Postman to send requests to your Express application. Ensure that you include appropriate headers to simulate different user roles.

For example, to test an admin user accessing the `POST /pets` endpoint:

```bash
curl -X POST http://localhost:3000/pets -H "User-Role: admin"
```

To test a regular user attempting to access the `POST /pets` endpoint:

```bash
curl -X POST http://localhost:3000/pets -H "User-Role: user"
```

You should see that the admin user is allowed to access the endpoint, while the regular user is denied.

## Conclusion

By following the steps outlined in this blog post, you can quickly and efficiently secure your Express application APIs using the Cedar authorization framework. This approach not only simplifies the process of adding authorization but also enhances the maintainability and security of your application. With Cedar, you can externalize your authorization logic, making it easier to manage and audit permissions over time.

For more detailed information and advanced use cases, refer to the [Cedar documentation](https://awslabs.github.io/cedar-policy/) and the [authorization-for-expressjs repository](https://github.com/awslabs/cedar-policy/tree/main/packages/authorization-for-expressjs). Happy coding!
