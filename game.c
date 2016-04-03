#include <stdio.h>
#include <stdlib.h>
#define Null -1
#define A_PLAYER 0
#define B_PLAYER 1
#define MAX 5
#define WINLINE  3
int table[MAX][MAX];
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
	for(i = 0;i<MAX;i++){
		for(j = 0;j<MAX;j++){
			table[i][j] = -1;
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
	kcc=kcr=0;//初始化kcc、kcr
	for(i = 0;i < MAX;i++){
		for(j = 0;j<MAX;j++){
			if(table[i][j]==who){kcr++;}else{kcr=0;};
			if(table[j][i]==who){kcc++;}else{kcc=0;};
			iswin=(kcc==WINLINE||kcr==WINLINE)?1:0;
			if(iswin) return iswin;//成功就返回；
		}
	}
	//对角线比较
	kcc=kcr=0;//初始化kcc、kcr
	for(i = 0;i<MAX;i++){
		for(j = 0;j+i<MAX;j++){
			if(table[i][j]==who){kcr++;}else{kcr=0;};
			if(table[j][i]==who){kcc++;}else{kcc=0;};
			iswin=(kcc==WINLINE||kcr==WINLINE)?1:0;
			if(iswin) return iswin;//成功就返回；
		}
	}
	//反对角线比较1
	kcc=kcr=0;//初始化kcc、kcr
	for(i = MAX-1;i>0;i--){
		for(j = 0;j<MAX&&i-j>=0;j++){
			if(table[i][i-j]==who){kcr++;}else{kcr=0;};
			iswin = (kcr==WINLINE)?1:0;
			if(iswin)return iswin;
		}
	}
	//反对角线比较1
	kcc=kcr=0;//初始化kcc、kcr
	for(i = 0;i<MAX;i++){
		for(tmp=i,j=MAX-1;j>i;j--,tmp++){
			if(table[tmp][j]==who){kcr++;}else{kcr=0;};
			iswin = (kcr==WINLINE)?1:0;
			if(iswin)return iswin;
		}
	}
	return 0;
}

void setKey(int who){
	int x,y;
	if(who == A_PLAYER){
		printf("A 玩家输入棋坐标（x y）：");
	}else{
		printf("B 玩家输入棋坐标（x y）：");
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
