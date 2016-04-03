#include <stdio.h>
#include <stdlib.h>
#define Null -1
#define A_PLAYER 0
#define B_PLAYER 1
#define MAX 3
//#define WINLINE  2
int table[MAX][MAX];
//int table;
//int MAX;
int WINLINE;
void init();
void refresh();
void print_who(int i,int j);
void setKey(int who);
int isWin(int who);
void clear();
void main(){
	int _isWin,who,_hand = 0;
	int i = 0;
	init();
	refresh();
	while(i++ < MAX*MAX){
		who = _hand%2;
		setKey(who);
		_isWin = isWin(who);
		if(_isWin){
			printf("\n胜负已定！！【%d】号玩家胜利！\n",who+1);
			break;
		}
		_hand++;
	}
	if(!_isWin)printf("不分胜负！");
}
void init(){
	int i,j;
	printf("几个子算赢？：");
	scanf("%d",&WINLINE);
	for(i = 0;i<MAX;i++){
		for(j = 0;j<MAX;j++){
			table[i][j] = Null;
		}
	}
}
void refresh(){
	int i,j,tmp;
	clear();
	printf("\n");
	for(i = 0;i<MAX;i++)printf("   %d",i+1);
	printf("\n");
	for(i = 0;i<MAX;i++){
		printf("%d ",i+1);
		for(j=0;j<MAX;j++){
			print_who(i,j);
			j+1<MAX?printf("|"):printf("\n");
		}
		if(i+1<MAX){
			printf("  ");
			for(tmp = 0;tmp<MAX;tmp++){
				printf(" ___");
			}
			printf("\n");
		}
	}
}

void clear(){
	system("clear");
}

int isWin(int who){
	int kcr,kcc;
	int iswin = 0;
	int i,j,tmp;
	//比较同行同列；
	printf("判定中1.0...\n");
	for(i = 0;i < MAX;i++){
		kcc=kcr=0;//初始化and防止跨行计算
		for(j = 0;j<MAX;j++){
			if(table[i][j]==who){kcr++;}else{kcr=0;}
			if(table[j][i]==who){kcc++;}else{kcc=0;}
			iswin=(kcc==WINLINE||kcr==WINLINE)?1:0;
			if(iswin)break;
		}
		if(iswin)break;
	}
	if(iswin)return iswin;
	printf("判定中2.0...\n");
	//正对角线比较
	kcc=kcr=0;
	for(i = 0;i<MAX;i++){
		if(table[i][i]==who)kcc++;else kcc=0;
		iswin=kcc==WINLINE?1:0;
		if (iswin) break;
	}
	if(iswin) return iswin;
	printf("判定中2.1...\n");
	//正对角线右上及左下比较
	for(i = 0;i<MAX;i++){
		kcc=kcr=0;
		for(j = 0;j+i<MAX;j++){
			if(table[j][j+i]==who)kcc++;else kcc=0;
			if(table[j+i][j]==who)kcr++;else kcr=0;
			iswin=kcc==WINLINE||kcr==WINLINE?1:0;
			if(iswin)break;
		}
		if(iswin)break;
	}
	if(iswin)return iswin;
	printf("判定中3.0...\n");
	//反对角线比较
	kcc=kcr=0;
	for(i = 0;i<MAX;i++){
		if(table[MAX-1-i][i]==who)kcc++;else kcc = 0;
		iswin=kcc==WINLINE?1:0;
		if(iswin)break;
	}
	if(iswin)return iswin;
	printf("判定中3.1...\n");
	//反对角线比较左上部分
	for(i = MAX-1;i>0;i--){
		kcc=kcr=0;
		for(j = 0;j<MAX&&i-j>=0;j++){
			if(table[j][i-j]==who)kcc++;else kcc=0;
			iswin=kcc==WINLINE?1:0;
			if(iswin)break;
		}
		if(iswin)break;
	}
	if(iswin)return iswin;
	printf("判定中3.2...\n");
	//反对角线比较右下部分
	for(i = 0;i<MAX;i++){
		kcc=kcr=0;
		for(tmp=i,j=MAX-1;j>=i;j--,tmp++){
			if(table[tmp][j]==who)kcc++;else kcc=0;
			iswin=kcc==WINLINE?1:0;
			if(iswin)break;
		}
		if(iswin)break;
	}
	if(iswin)return iswin;
	return 0;
}

void setKey(int who){
	int x,y;
	if(who == A_PLAYER){
		printf("A 玩家\"o\"输入棋坐标（x y）：");
	}else{
		printf("B 玩家\"*\"输入棋坐标（x y）：");
	}
	scanf("%d %d",&x,&y);
	while(!(x<=MAX) || !(y<=MAX)){
		refresh();
		printf("(%d,%d)输入有误请重新输入(x y)：",x,y);	
		scanf("%d %d",&x,&y);
	}
	while(table[x-1][y-1] != Null){
		refresh();
		printf("(%d,%d)已经有人下过了，请重新输入(x y)：",x,y);	
		scanf("%d %d",&x,&y);
	}
	table[x-1][y-1] = who;		
	refresh();
}

void print_who(int i,int j){
	if(i>=MAX || j>=MAX)return;
	if(table[i][j] == -1){
		printf("   ");
	}else if(table[i][j] == 0){
		printf(" O ");
	}else{
		printf(" * ");
	}
}
