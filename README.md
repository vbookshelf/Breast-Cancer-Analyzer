
## Breast-Cancer-Analyzer

Live Web App: http://histo.test.woza.work/

<br>

<img src="http://histo.test.woza.work/assets/histo_sample.png" width="350"></img>

<br>

This is a prototype for a freely available online tool that can detect two forms of Breast Cancer in histopathology image patches. The current histopathology process is time consuming and small malignant areas can be missed. This app can help speed up a pathologist's workflow and provide diagnosis support.

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

<b>The entire model building and training process is described in these two Kaggle kernels:</b>

Part 1 : Breast Cancer Analyzer + Web App<br>
https://www.kaggle.com/vbookshelf/part-1-breast-cancer-analyzer-web-app/notebook

Part 2 : Breast Cancer Analyzer + Web App<br>
https://www.kaggle.com/vbookshelf/part-2-breast-cancer-analyzer-web-app/notebook




The python code to build and train the models is included in the Jupyter notebook. All the javascript, css and html files are also freely available here. The trained models are also available.

<hr>

Bugs & Lessons Learned:

1. A large part of the web, including the web app for this project uses the Javascript language. I used Javascript to feed the images to the model. The challenge lies in the fact that Javascript is very fast whereas the model is not. This difference in speed can lead to incorrect predictions.<br>
For example, say we are using a loop to feed ten images to the model for prediction. Because of the realtively slower prediction speed, the model may end up making all of it's ten predictions using only image1 or image10. To solve this problem, on each iteration of the loop, we must make the code wait for the model to finish a prediction before the next loop begins i.e. before feeding it the next image.<br>
In the app I used async/await to achieve this. Because my Javascript knowledge is very basic, you should check the Javascript code thoroughly before using it in one of your own projects.


2. I think there is one other potential source of prediction errors. In order to read an image Tensorflowjs needs the image to first be made part of an html image element. It then reads this image element and converts it into a tensor. When using multiple images, delays relating to putting an image into an html element (setting the src attribute) could also cause prediction errors. The programmer needs to keep this in mind especially if the image sizes are large.


3. Most web browsers don't support the tiff image format. This needs to be kept in mind when pre-processing training data if the intention is to build a web app.


4. Because Tensorflowjs is a new technology, web apps bulit using it may not work in some browsers. The user will see a message saying the "Ai is loading..." but that message will never go away because the app is actually frozen. It's better to advise users to use the latest version of Chrome.
