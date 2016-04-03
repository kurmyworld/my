#include<stdio.h>
#define MAX 5
void main(){
	int i,j,k;
	int tmp;
	for(i = 0;i<MAX;i++){
		for(j=0;j<MAX;j++){
			printf("(%d,%d)\t",i,j);
		}			
		printf("\n");
	}
	printf("---------原始坐标表----------------------------------\n");
	for(i = 0;i<MAX;i++){
		for(j=0;j<MAX;j++){
			printf("(%d,%d)\t",j,i);
		}			
		printf("\n");
	}
	printf("----------纵向输出---------------------------------\n");
	for(i = 0;i<MAX;i++){
		printf("(%d,%d)\t",i,i);
	}
	printf("\n");
	printf("-----------输出对角--------------------------------\n");
	for(i = 0;i<MAX;i++){
		printf("(%d,%d)\t",MAX-1-i,i);
	}
	printf("\n");
	printf("-----------反对角线--------------------------------\n");
	
	for(i = 0;i<MAX;i++){
		for(j = 0;j+i<MAX;j++){
			printf("(%d,%d)\t",j,j+i);
		}
		printf("\n");
	}
	printf("-----------正对角线右上部分--------------------------------\n");
	for(i = 0;i<MAX;i++){
		for(j = 0;j+i<MAX;j++){
			printf("(%d,%d)\t",i+j,j);
		}
		printf("\n");
	}
	printf("-----------正对角线左下部分--------------------------------\n");
	for(i = MAX-1;i>0;i--){
		for(j = 0;j<MAX&&i-j>=0;j++){
			printf("(%d,%d)\t",j,i-j);
		}
		printf("\n");
	}
	printf("------------反对角线左上部分-------------------------------\n");
	for(i = 0;i<MAX;i++){
		for(tmp=i,j=MAX-1;j>=i;j--,tmp++){
			printf("(%d,%d)\t",tmp,j);
		}
		printf("\n");
	}
	printf("------------反对角线右下部分-------------------------------\n");	

}
