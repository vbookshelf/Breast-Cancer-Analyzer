





//################################################################################

// ### 2. MAKE A PREDICTION ON THE IMAGE OR MULTIPLE IMAGES THAT THE USER SUBMITS

//#################################################################################





// met cancer model images have size 96x96

async function met_makePrediction(fname) {
	
	//console.log('met_cancer');
	
	// clear the previous variable from memory.
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
				className: MET_CANCER_CLASSES[i] // we are selecting the value from the obj
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 2);
		
	// Append the file name to the prediction list
	$("#prediction-list").append(`<li class="w3-text-teal">${fname}</li>`);
	
	//$("#prediction-list").empty();
	top5.forEach(function (p) {
	
		$("#prediction-list").append(`<ol>${p.className}: ${p.probability.toFixed(6)}</ol>`);
	
		
	});
		
}




// =====================
// The following functions help to solve the problems relating to delays 
// in assigning the src attribute and the delay in model prediction.
// Without this the model will produce unstable predictions because
// it will not be predicting on the correct images.


// This tutorial explains how to use async, await and promises to manage delays.
// Tutorial: https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795
// =====================



function met_delay() {
	
	return new Promise(resolve => setTimeout(resolve, 200));
}


async function met_delayedLog(item, dataURL) {
	
	// We can await a function that returns a promise.
	// This delays the predictions from appearing.
	// Here it does not actually serve a purpose.
	// It's here to show how a delay like this can be implemented.
	await met_delay();
	
	// The problem is here. Too slow.
	$("#selected-image").attr("src", dataURL);
	
	// log the item only after a delay.
	//console.log(item);
}

// This step by step tutorial explains how to use FileReader.
// Tutorial: http://tutorials.jenkov.com/html5/file-api.html

async function met_processArray(array) {
	
	for(var item of fileList) {
		
		
		let reader = new FileReader();
		
		// clear the previous variable from memory.
		let file = undefined;
	
		
		reader.onload = async function () {
			
			let dataURL = reader.result;
			
			await met_delayedLog(item, dataURL);
			
			
			
			var fname = file.name;
			
			// clear the previous predictions
			$("#prediction-list").empty();
			
			// 'await' is very important here.
			await met_makePrediction(fname);
		}
		
		file = item;
		
		// Print the name of the file to the console
        //console.log("i: " + " - " + file.name);
			
		reader.readAsDataURL(file);
	}
}













