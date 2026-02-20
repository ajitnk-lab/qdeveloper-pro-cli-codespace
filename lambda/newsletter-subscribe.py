import json
import os
import urllib.request
import urllib.error
import boto3

secrets_client = boto3.client('secretsmanager')

def get_brevo_config():
    secret_arn = os.environ['BREVO_SECRET_ARN']
    response = secrets_client.get_secret_value(SecretId=secret_arn)
    secret = json.loads(response['SecretString'])
    return secret['apiKey'], secret['listId']

def handler(event, context):
    # Handle CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': ''
        }
    
    try:
        body = json.loads(event['body'])
        name = body.get('name')
        email = body.get('email')
        
        if not name or not email:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Name and email required'})
            }
        
        # Get Brevo credentials
        api_key, list_id = get_brevo_config()
        
        # Call Brevo API
        data = json.dumps({
            'email': email,
            'attributes': {'FIRSTNAME': name},
            'listIds': [int(list_id)],
            'updateEnabled': True
        }).encode('utf-8')
        
        req = urllib.request.Request(
            'https://api.brevo.com/v3/contacts',
            data=data,
            headers={
                'accept': 'application/json',
                'api-key': api_key,
                'content-type': 'application/json'
            },
            method='POST'
        )
        
        with urllib.request.urlopen(req) as response:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True})
            }
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': error_body
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
