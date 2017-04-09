#python script.py



#for gold, algo in zip
for file in gold_standard/summary_en/*
do
  python -m sumy.evaluation text-rank 
done


