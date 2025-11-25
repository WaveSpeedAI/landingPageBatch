import json
import logging
from django.shortcuts import render
logger = logging.getLogger("logview.project")
def wavespeed_feature(request, keyword = 'remove_objects_from_photos'):
    json_name = f'{keyword}'
    json_path = f'internal/wavespeed_data/feature/{json_name}.json'
    logger.info(f"Loading wavespeed feature-{keyword} data from: {json_path}")
    with open(json_path,'r', encoding='utf-8') as f:
        data = json.load(f)
    return render(request, 'wavespeed_feature.html', data)

def home(request):
    return render(request, 'wavespeed.html')
