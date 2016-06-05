# coding=utf=8

import requests,re

def mk_keyword(keyword=0):
    if(keyword==0):
        keyword=input("请输入关键字，演员名字或电影名称:\n>")
    s = '正在查找跟【keyword】有关的电影/电视剧'
    print(s.replace('keyword',keyword))
    keyword=keyword.encode('gb2312')
    return {'keyword':keyword}

def getHtml(host,path,encode='UTF-8',data=0):
    if(data==0):
        response=requests.get(host+path)
        response.encoding=encode
        return response.text
    else:
        response=requests.post(host+path,data)
        response.encoding=encode
        return response.text

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
        html = getHtml(host,movieList[i],'gb2312')
        playList.append(matchPlayPath(html))
    return playList


def matchPlayPath(html):
    # 匹配详情页面中的 play_1_1.html
    pattern = 'play_\S+.html'
    pattern = re.compile(pattern)
    result=re.findall(pattern,html)
    return result;

def matchThunder(html):
    
    thunder = 'thunder[\W+][a-zA-z0-9/=+]+'
    thunder = re.compile(thunder)

    title = '<title>\S+'
    title = re.compile(title)
    
    title = re.findall(title,html)[0].replace('<title>','')
    s = '正在查找【title】的迅雷资源'
    print(s.replace('title',title))
    
    result = re.findall(thunder,html)    
    if (len(result)!=0):
        return {'title':title,'link':result[0]}
    else:
        return {}

def getThunderList(host,movieList,playList):
    result = []
    for i in range(0,len(movieList)):
        for j in range(0,len(playList[i])):
            html = getHtml(host,movieList[i]+playList[i][j],'gb2312')
            m = matchThunder(html)
            if(len(m)!=0):
                result.append(m)
    return result

def getMoviesTitle(html):
    pattern = '>\S{0,}</a></h3>'
    reg = re.compile(pattern)
    result = re.findall(reg,html)
    for i in range(0,len(result)):
        result[i] = result[i].replace('>','')
        result[i] = result[i].replace('</a</h3','')
        result[i] = result[i].replace('</font','')
    return result

def initSearch(keyword):
    html = getHtml(host,path,'gb2312',keyword)
    size = getPageSize(html)
    if(size == 1):
        return html
    else:
        for i in range(2,size+1):
            keyword['page']=i
            html = html + getHtml(host,path,'gb2312',keyword)
    return html

def printThunderList(thunderList):
    if(len(thunderList)==0):
        return
    print('\n==============【迅雷资源列表】===================\n')
    for i in range(0,len(thunderList)):
        s = '----【title】------\nLINK\n'
        print(s.replace('title',thunderList[i]['title']).replace('LINK',thunderList[i]['link']))
    print('\n==============【迅雷资源列表】===================\n')


def printTitles(titles):
    if(len(titles)==0):
        print('抱歉没有找到相关迅雷资源QAQ')
        return
    print('为您找到以下相关电影：')
    for i in range(0,len(titles)):
        print('>>'+str(i)+'. '+titles[i])
    print('===========================\n')

def start(html):
    movieList = getMovieList(html)
    playList = getPlayList(movieList)
    thunderList = getThunderList(host,movieList,playList)
    printThunderList(thunderList)

if __name__ == '__main__':
    host = 'http://www.tt27.tv/'
    # path = 'dz/36621/'
    path = 'search.asp'
    keyword = mk_keyword();
    html = initSearch(keyword)
    titles = getMoviesTitle(html)
    printTitles(titles)
    if(len(titles)!=0):        
        try:
            case = int(input('请输入电影序号:\n>'))
        except:
            case = 0
        keyword = titles[case]
        keyword = mk_keyword(keyword)
        html = initSearch(keyword);
        titles = getMoviesTitle(html)
        printTitles(titles)
        start(html)
    input('感谢使用，回车键退出')
    
        
        
        

