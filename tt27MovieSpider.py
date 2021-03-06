# coding=UTF-8

import re,os
try:
    import requests
except:
    print('正在下载requests模块')
    os.system('pip install requests')
    print('模块已下载,正在继续...')
    import requests

def mk_keyword(keyword=0):
    if(keyword==0):
        keyword=str(input("请输入关键字，演员名字或电影名称:\n>"))
        while(len(keyword.replace(' ',''))==0):
            keyword=str(input("请输入关键字，演员名字或电影名称:\n>"))
    s = '正在查找跟【keyword】有关的电影/电视剧，请稍候...'
    print(s.replace('keyword',keyword))
    keyword=keyword.encode('gb2312')
    return {'keyword':keyword}

def getHtml(url,data=0):
    encode='gb2312'
    try:
        if(data==0):
            response=requests.get(url)
            response.encoding=encode
            html = response.text
        else:
            response=requests.post(url,data)
            response.encoding=encode
            html = response.text
    except:
        input('getHtml Exception')
    return html

def getPageSize(html):  
    reg = '\d+页</span>'
    reg = re.compile(reg)
    return int(re.findall(reg,html)[0].replace('页</span>',''))

def getMovieList(searchResultHTML):  
    # 获取电影详情页面路径
    pattern = '<h3><a href="\S{1,}"'
    pattern = re.compile(pattern)
    result=re.findall(pattern,searchResultHTML)
    for i in range(0,len(result)):
        result[i]=result[i].replace('<h3><a href="','')
        result[i]=result[i].replace('"','')
    return result;

def getPlayList(movieList):  
    playList = []
    for i in range(0,len(movieList)):
        url = host+movieList[i]
        html = getHtml(url)
        playList.append(matchPlayPath(html))
    return playList


def matchPlayPath(html):
    result = []
    # 匹配详情页面中的 play_1_1.html
    for i in range(1,4):
        pattern = 'play_i_\d+.html'
        pattern = pattern.replace('i',str(i))
        pattern = re.compile(pattern)
        tmp = re.findall(pattern,html)
        if(len(tmp)!=0):
            result.append(tmp)
        else:
            break
    return result

def matchThunder(html):

    thunder = 'thunder[\W+][a-zA-z0-9/=+]+'
    thunder = re.compile(thunder)

    magnet = 'magnet:[a-zA-Z0-9?=:]+'
    magnet = re.compile(magnet)

    title = '<title>\S+'
    title = re.compile(title)
    title = re.findall(title,html)[0].replace('<title>','')

    result = re.findall(thunder,html)
    if (len(result)!=0):
        return {'title':title,'link':result[0]}
    result = re.findall(magnet,html)
    if (len(result)!=0):
        return {'title':title,'link':result[0]}
    return {}

def getThunderList(host,movieList,playList):  
    result = []
    for i in range(0,len(movieList)):
        for j in range(0,len(playList[i])):
            for k in range(0,len(playList[i][j])):
                url = host+movieList[i]+playList[i][j][k]
                html = getHtml(url)
                m = matchThunder(html)
                if(len(m)!=0):             
                    result.append(m)
                else:
                    break
    return result

def getMoviesTitle(html):
    pattern = 'blank">.*</a></h3>'
    reg = re.compile(pattern)
    result = re.findall(reg,html)
    for i in range(0,len(result)):
        result[i] = result[i].replace('blank">','')
        result[i] = result[i].replace('</a></h3>','')
        result[i] = result[i].replace('</font','')
    return result

def initSearch(keyword):
    url = host+path
    html = getHtml(url,keyword)
    body='<div class="listBox">[.\S\W\w]*<div class="mainRight">'
    body=re.compile(body)
    html=re.findall(body,html)[0]
    size = getPageSize(html)
    if(size == 1):
        return html
    else:
        for i in range(2,size+1):
            print('查找'+str(i)+'/'+str(size)+'页')
            keyword['page']=i
            html = html + re.findall(body,getHtml(url,keyword))[0]
    return html

def printThunderList(thunderList):  
    if(len(thunderList)==0):
        print('对不起，找不到相关下载资源')
        return
    print('\n==============【资源列表】===================\n')
    for i in range(0,len(thunderList)):
        s = '----【title】------\nLINK\n'
        print(s.replace('title',thunderList[i]['title']).replace('LINK',thunderList[i]['link']))
    print('\n==============【资源列表】===================\n')


def printTitles(titles):
    try:
        print('为您找到以下相关电影：')
        for i in range(0,len(titles)):
            print('>>'+str(i)+'. '+titles[i])
        print('===========================\n')
    except:
        print('printTitles Exception')

def start():
    keyword = mk_keyword();
    html = initSearch(keyword)
    titles = getMoviesTitle(html)
    movieList = getMovieList(html)
    if(len(titles)!=0):
        titles.append('以上所有')
        printTitles(titles)
        try:
            case = int(input('请输入电影序号:\n>'))
        except:
            case = 0
    else:
        print('找不到相关电影/电视剧')
        return
    s = '正在查找【title】的资源，请稍候...'
    print(s.replace('title',titles[case]))
    if(case < len(movieList)):
        movieList=[movieList[case]]
    playList = getPlayList(movieList)
    thunderList = getThunderList(host,movieList,playList)
    printThunderList(thunderList)

if __name__ == '__main__':
    host = 'http://www.tt27.tv/'
    path = 'search.asp'
    try:
        start()
    except:
        print('遇到了一个错误，换个关键字搜吧~')
        pass
    try:
        while (int(input('1.继续使用\n直接回车退出\n>'))==1):
            try:
                start()
            except:
                print('遇到了一个错误，换个关键字搜吧~')
                pass
    except:
        pass
    input('感谢使用，回车键退出')
