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
    try:
        body = json.loads(event['body'])
        title = body.get('title')
        url = body.get('url')
        content_type = body.get('type', 'blog')
        
        if not title or not url:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Title and URL required'})
            }
        
        # Get Brevo credentials
        api_key, list_id = get_brevo_config()
        
        # Create email campaign
        campaign_data = json.dumps({
            'sender': {
                'name': 'CloudNestle',
                'email': 'noreply@cloudnestle.com'
            },
            'name': f'New {content_type}: {title}',
            'subject': f'New {content_type}: {title}',
            'htmlContent': f'''
                <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New {content_type.title()} Published!</h2>
                    <h3>{title}</h3>
                    <p>Check it out:</p>
                    <a href="{url}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Read Now</a>
                </body>
                </html>
            ''',
            'recipients': {
                'listIds': [int(list_id)]
            }
        }).encode('utf-8')
        
        # Create campaign
        req = urllib.request.Request(
            'https://api.brevo.com/v3/emailCampaigns',
            data=campaign_data,
            headers={
                'accept': 'application/json',
                'api-key': api_key,
                'content-type': 'application/json'
            },
            method='POST'
        )
        
        with urllib.request.urlopen(req) as response:
            campaign = json.loads(response.read().decode('utf-8'))
            campaign_id = campaign['id']
        
        # Send campaign immediately
        send_req = urllib.request.Request(
            f'https://api.brevo.com/v3/emailCampaigns/{campaign_id}/sendNow',
            headers={
                'accept': 'application/json',
                'api-key': api_key
            },
            method='POST'
        )
        
        with urllib.request.urlopen(send_req) as response:
            return {
                'statusCode': 200,
                'body': json.dumps({'success': True, 'campaignId': campaign_id})
            }
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'body': error_body
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
