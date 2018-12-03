
== DRAFT ==

Live Web App: 

This is a prototype for a freely available online tool that can detect two forms of Breast Cancer in histopathology image patches. The existing histopathology process is time consuming and small malignant areas can be missed. This app can help speed up a pathologist's workflow and provide diagnosis support.

<hr>

<b>The app has two models. Each model can detect one of the following:</b>

1. Metastatic Cancer - Cancer that has spread from the site of origin to other area/s of the body.
2. Invasive Ductal Carcinoma - The most common subtype of breast cancer.


<b>These are the papers that discuss the datasets that I used to train the two models:</b>

1399 H&E-stained sentinel lymph node sections of breast cancer patients: the CAMELYON dataset<br>
https://academic.oup.com/gigascience/article/7/6/giy065/5026175

Automatic detection of invasive ductal carcinoma in whole slide images with Convolutional Neural Networks<br>
https://www.researchgate.net/publication/263052166_Automatic_detection_of_invasive_ductal_carcinoma_in_whole_slide_images_with_Convolutional_Neural_Networks

<b>These are the links to the datasets:</b>

https://www.kaggle.com/c/histopathologic-cancer-detection<br>
(.tiff image format)

https://www.kaggle.com/paultimothymooney/breast-histopathology-images<br>
(.png image format)

<b>The entire model building and training process is described in two Kaggle kernels:</b>





The python code to build and train the models is included in the Jupyter notebook. All the javascript, css and html files are also freely available here. The trained models are also available.

<hr>

Bugs & Lessons Learned:
1. Chrome does not support tiff images.
