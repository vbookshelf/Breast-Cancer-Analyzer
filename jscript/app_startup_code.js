

/*
OVERVIEW

This app has two models. The user uses the radio buttons to select which 
model is to be used to predict on the submitted images.

*/

//############################

// PAGE LOAD

//############################


// When the page loads, make the Met cancer model active.
MET_CANCER_MODEL_SELECTED = 'yes';
BREAST_CANCER_MODEL_SELECTED = 'no';

// Hide the text showing which model is active
$('.breast-cancer').hide();
$('.metastatic-cancer').hide();



//############################

// RADIO BUTTON CHANGE EVENTS

//############################


// This change event fires when the met_cancer option is selected.
// Hide the Breast Cancer Analyzer text
$('#met_cancer_input').change(function(){
	
	//console.log('met_cancer');
	
	MET_CANCER_MODEL_SELECTED = 'yes';
	BREAST_CANCER_MODEL_SELECTED = 'no';
	
	// Show the message saying which analyzer is active.
	$('.breast-cancer').hide();
	$('.metastatic-cancer').show();
	
});

// This change event fires when the breast_cancer option is selected.
// Hide the Metastatic Cancer Analyzer text
$('#breast_cancer_input').change(function(){
	
	//console.log('breast_cancer');
	
	MET_CANCER_MODEL_SELECTED = 'no';
	BREAST_CANCER_MODEL_SELECTED = 'yes';
	
	
	// Show the message saying which analyzer is active.
	$('.metastatic-cancer').hide();
	$('.breast-cancer').show();
});


//#############################################################

// ### 1. LOAD THE TWO MODELS IMMEDIATELY WHEN THE PAGE LOADS

//#############################################################


// NOTE:
// breast_cancer_model = idc_model (Kernel Part 1)
// met_cancer_model = metastatic_model (Kernel Part 2)






// BREAST CANCER MODEL
// This model will load first


let breast_cancer_model;
(async function () {
	
	breast_cancer_model = await tf.loadModel('http://histo.test.woza.work/idc_model_v1/model.json');
	$("#selected-image").attr("src", "http://histo.test.woza.work/assets/normal.png");
	
})();

	


// MET CANCER MODEL

let met_cancer_model;
(async function () {
	
	met_cancer_model = await tf.loadModel('http://histo.test.woza.work/metastatic_model_v1/model.json');
	$("#selected-image").attr("src", "http://histo.test.woza.work/assets/normal.png");
	
	// Hide the model loading spinner
	$('.progress-bar').hide();
	
	// Show the met cancer text indicating that the met cancer model is active
	$('.metastatic-cancer').show();
	// Hide the breast cancer text indicating that the breast cancer model is active
	$('.breast-cancer').hide();
	
	// Simulate a click on the predict button.
	// Make a prediction on the default front page image.
	met_cancer_predictOnLoad();
	
})();



	

//######################################################################

// ### 2. MAKE A PREDICTION ON THE FRONT PAGE IMAGE WHEN THE PAGE LOADS

//######################################################################

// After the model loads we want to make a prediction on the default image.
// Thus, the user will see predictions when the page is first loaded.

function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}





function met_cancer_predictOnLoad() {
	
	// Simulate a click on the predict button
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
}



// This make a met_cancer prediction when the page loads.
// met cancer model images have size 96x96
$("#predict-button").click(async function () {
	
	let image = undefined;
	
	image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.fromPixels(image)
	.resizeNearestNeighbor([96,96]) // change the image size here
	.toFloat()
	.div(tf.scalar(255.0))
	.expandDims();
	
	
	// Pass the tensor to the model and call predict on it.
	// Predict returns a tensor.
	// data() loads the values of the output tensor and returns
	// a promise of a typed array when the computation is complete.
	// Notice the await and async keywords are used together.
	let predictions = await met_cancer_model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: MET_CANCER_CLASSES[i]
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 2);
	

		// Append the file name to the prediction list
		var file_name = 'default_image.jpg';
		$("#prediction-list").append(`<li class="w3-text-teal">${file_name}</li>`);
		
		//$("#prediction-list").empty();
		top5.forEach(function (p) {
		
			$("#prediction-list").append(`<ol>${p.className}: ${p.probability.toFixed(6)}</ol>`);
		
			
		});
	
	
});




//#########################################################

// Code that will be executed when the user submits images.

// The code below directs the execution to either the breast_cancer_analyzer.js
// file or to the met_cancer_analyzer.js file - where the prediction is made.

//##########################################################


// This listens for a change. It fires when the user submits images.

$("#image-selector").change(async function () {
	
	// if the met cancer radio button was selected
	// The variable value was set above by a change event.
	if (MET_CANCER_MODEL_SELECTED === 'yes') {
	
		// the FileReader reads one image at a time
		fileList = $("#image-selector").prop('files');
		
		//$("#prediction-list").empty();
		
		// Start predictiing
		met_processArray(fileList);
	}
	
	// if the breast cancer radio button was selected
	// The variable value was set above by a change event.
	if (BREAST_CANCER_MODEL_SELECTED === 'yes') {
	
		// the FileReader reads one image at a time
		fileList = $("#image-selector").prop('files');
		
		//$("#prediction-list").empty();
		
		// Start predictiing
		breast_processArray(fileList);
	}
    

	
});





