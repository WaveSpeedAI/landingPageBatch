import json
import logging
from django.shortcuts import render
from django.http import JsonResponse
import regex 

logger = logging.getLogger("logview.project")

def get_keyword_map():
    json_path = f'internal/keyword_map.json'
    logger.info(f"Loading wavespeed keyword_map data from: {json_path}")
    with open(json_path,'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def to_snake(text: str) -> str:
    # 1. 转小写（保留 unicode 字母）
    s = text.lower()

    # 2. 非字母数字全部替换成 '-'
    #    \p{L} = 任意语言的字母
    #    \p{N} = 任意语言的数字
    s = regex.sub(r"[^\p{L}\p{N}]+", "_", s)

    # 4. 去除首尾 '-'
    return s.strip("-")

def wavespeed_api_feature(request, keyword = 'remove_objects_from_photos'):
    keyword_map_data = get_keyword_map()
    target = keyword_map_data[keyword]
    json_name = f'{to_snake(target.get("keyword"))}_{target.get("language")}'
    json_path = f'internal/feature_translate/{json_name}.json'
    logger.info(f"Loading wavespeed feature-{json_name}- data from: {json_path}")
    with open(json_path,'r', encoding='utf-8') as f:
        data = json.load(f)
    return JsonResponse(data)

def wavespeed_api_feature_keyword_map(request):
    data = get_keyword_map()
    return JsonResponse(data)


def wavespeed_feature(request, keyword = 'remove_objects_from_photos'):
    # json_name = f'{keyword}'
    # json_path = f'internal/feature_discard/{json_name}.json'
    # logger.info(f"Loading wavespeed feature-{keyword} data from: {json_path}")
    # with open(json_path,'r', encoding='utf-8') as f:
    #     data = json.load(f)
    return render(request, 'index.html')

def home(request):
    return render(request, 'wavespeed.html')
