import pandas as pd
#import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import re as re

def my_function(date):
    temp=pd.read_csv('temp', sep=',')
    i=0
    for x in temp.min_temp:
        if x<10:
            temp.min_temp.iloc[i]=10
        if x>30:
            temp.min_temp.iloc[i]=30     
        i=i+1

    i=0
    for x in temp.max_temp:
        if x <10:
            temp.max_temp.iloc[i]=10
        if x>30:
            temp.max_temp.iloc[i]=30 
        i=i+1    
    temp
    y=int(temp[temp.Datum==date].index.values)
    GDD_date=0
    for x in range(y+1):    
        GDD_date+=((temp.min_temp[x]+temp.max_temp[x])/2)-10
    return GDD_date 
my_function('20.05.2019')

def get_tree_pre(date,gdd_infile='wachstumsgradtag.csv',climate_infile='climate_heidelberg_tima_and_date.csv'):
    gdd_date=my_function(date)
    gdd_trees = pd.read_csv(gdd_infile, sep='\t', encoding='utf-8')
    monthly_temp = pd.read_csv(climate_infile,sep='\t')
    #monthly_temp
    i=0
    for x in monthly_temp.Min:
        if x<10:
            monthly_temp.Min.iloc[i]=10
        if x>30:
            monthly_temp.Min.iloc[i]=30     
        i=i+1
    i=0
    for x in monthly_temp.Max:
        if x <10:
            monthly_temp.Max.iloc[i]=10
        if x>30:
            monthly_temp.Max.iloc[i]=30 
        i=i+1    
    #temp
    monthly_temp['average_weekly_gdd']=((monthly_temp.Max+monthly_temp.Min)/2-10)*7
    #monthly_temp
    month=int(re.findall('\d{2}[.](\d{2})[.]\d{4}',date)[0])
    #month
    averg_gdd=float(monthly_temp[monthly_temp.Month==month].average_weekly_gdd)
    #averg_gdd
    prdctd=gdd_date+averg_gdd
    #prdctd
    #gdd_trees
    blooming=gdd_trees[(gdd_trees["minGDD"]<prdctd) & (gdd_trees["minGDD"]>gdd_date)].Latin.tolist()
    print(blooming)
    return blooming
get_tree_pre(date)
