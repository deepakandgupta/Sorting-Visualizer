var values = [];
var copyArr = [];
var displayArr = [];
var qArr = [];
var quickAnimation = [];
var timeAlgo = 10;
var canvas = document.getElementById("sortingAnimation");
canvas.width = window.innerWidth * 0.99;
canvas.height = window.innerHeight * 0.9;
var barWidth = 20;
var spaceBtwBars = 25;
if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
}

ctx.fillStyle = "aquamarine";
var maxBarNum = Math.floor(canvas.width / spaceBtwBars) - 1;
var numOfBars = maxBarNum;
var slider = document.getElementById("barNums");
var rangeValues = document.getElementById("barsNum");
slider.max = maxBarNum;
slider.value = maxBarNum;
barsNum.innerHTML = slider.value;

slider.oninput = function() {
  barsNum.innerHTML = this.value;
  numOfBars = this.value;
};
//----------------------
var timeT = document.getElementById("timeTaken");
var timeRange = document.getElementById("timeNum");
timeNum.innerHTML = timeT.value;

timeT.oninput = function() {
  timeNum.innerHTML = this.value;
  timeAlgo = this.value;
};
//----------------------
console.log(maxBarNum);

ctx.fillRect(0, 0, canvas.width, canvas.height);
populateValues();
function populateValues() {
  clearCanvas();
  values = [];
  for (var i = 0; i < numOfBars; i++) {
    values.push(Math.floor(Math.random() * canvas.height * 0.9) + 1);
    //console.log("|" + values[i] + "|");
  }
  copyArr = [];
  displayArr = [];
  drawArray();
}
function initArr() {
  quickAnimation = [];
  copyArr = values.slice();
  qArr = values.slice();
  displayArr = values.slice();
}
function drawArray() {
  for (var i = 0; i < values.length; i++) {
    ctx.fillStyle = "black";
    // console.log("|" + values[i] + "|");
    ctx.fillRect(
      (i + 1) * spaceBtwBars - 10,
      canvas.height - values[i],
      barWidth,
      values[i]
    );
  }
}
function bubbleSort() {
  var i = 0;
  var j = 0;
  var intervalI = setInterval(function() {
    j = 0;
    var intervalJ = setInterval(function() {
      console.log(" j is |" + j + "|");
      clearCanvas();
      for (var k = 0; k < values.length; k++) {
        if (k == j || k == j + 1) {
          ctx.fillStyle = "yellow";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillRect(
          (k + 1) * spaceBtwBars - 10,
          canvas.height - values[k],
          barWidth,
          values[k]
        );
      }
      if (values[j] > values[j + 1]) {
        clearCanvas();
        for (var k = 0; k < values.length; k++) {
          if (k == j || k == j + 1) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "black";
          }
          ctx.fillRect(
            (k + 1) * spaceBtwBars - 10,
            canvas.height - values[k],
            barWidth,
            values[k]
          );
        }
        swap(values[j], values[j + 1], j);
      }
      if (j >= values.length - i) {
        // console.log("exiting J loop now");
        clearInterval(intervalJ);
      }
      j++;
    }, timeAlgo);
    //console.log("starting i loop now");
    console.log("i is |" + i + "|");
    if (i >= values.length) {
      console.log("Stopped sorting");
      enableButtons();
      clearInterval(intervalI);
    }
    i++;
  }, (values.length - i + 1) * timeAlgo); // adding time by anticipating the exit time of first loop of set timeout
}

function swap(val1, val2, x) {
  values[x] = val2;
  values[x + 1] = val1;
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "aquamarine";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// Just the algorithm part with setIntevals----------------------------------------------------->
// function selectionSort() {
//   var sValues = values; // copying array instead of shallow copy/Referencing
//   console.log(sValues.length);
//   var i = 0;
//   var j = 0;
//   //sValues ==4
//   var intervalI = setInterval(function() {
//     if (i >= sValues.length - 2) {
//       clearInterval(intervalI);
//     }
//     j = i + 1;
//     var minE = i;
//     var intervalJ = setInterval(function() {
//       console.log("Its a swap|");

//       if (values[minE] > values[j]) {
//         minE = j;
//       }
//       console.log("j---> |" + j + "|" + "|" + (i - 1));

//       if (j >= sValues.length - 1) {
//         var temp = values[i - 1];
//         values[i - 1] = values[minE];
//         values[minE] = temp;
//         clearInterval(intervalJ);
//       }
//       j++;
//     }, timeAlgo);
//     console.log("i---> |" + i + "|");
//     i++;
//   }, (sValues.length + 1) * timeAlgo);
// }
//----------------------------------------------------------------------------------------
function selectionSort() {
  var sValues = values; // copying array instead of shallow copy/Referencing
  console.log(sValues.length);
  var i = 0;
  var j = 0;
  //sValues ==4
  var intervalI = setInterval(function() {
    if (i >= sValues.length - 1) {
      console.log("We may run at last");
      enableButtons();
      clearInterval(intervalI);
    }
    j = i + 1;
    var minE = i;
    var intervalJ = setInterval(function() {
      //------------------------------------
      clearCanvas();
      for (var k = 0; k < values.length; k++) {
        if (k == minE || k == j) {
          ctx.fillStyle = "yellow";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillRect(
          (k + 1) * spaceBtwBars - 10,
          canvas.height - values[k],
          barWidth,
          values[k]
        );
      }
      //------------------------------------
      if (values[minE] > values[j]) {
        console.log("Its a swap|");
        minE = j;
      }
      console.log("j---> |" + j + "|" + "|" + (i - 1));
      if (j >= sValues.length - 1) {
        clearCanvas();
        for (var k = 0; k < values.length; k++) {
          if (k == minE) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "black";
          }
          ctx.fillRect(
            (k + 1) * spaceBtwBars - 10,
            canvas.height - values[k],
            barWidth,
            values[k]
          );
        }
        var temp = values[i - 1];
        values[i - 1] = values[minE];
        values[minE] = temp;
        clearInterval(intervalJ);
      }
      j++;
    }, timeAlgo);
    console.log("i---> |" + i + "|");
    i++;
  }, (sValues.length + 1) * timeAlgo);
}
var mergeAnimation = [];
//-----------------------------------------------------------------------------------------------
// var mergeAnimation = [];

// function mergeSort(mArr) {
//   if (mArr.length < 2) {
//     return;
//   }
//   var mid = Math.floor(mArr.length / 2);
//   var left = [];
//   var right = [];
//   for (var i = 0; i < mArr.length; i++) {
//     if (i < mid) {
//       left.push(mArr[i]);
//     } else {
//       right.push(mArr[i]);
//     }
//   }
//   mergeSort(left);
//   mergeAnimation.push(left);
//   mergeSort(right);
//   mergeAnimation.push(right);
//   merge(mArr, left, right);
// }
// function merge(mArr, lArr, rArr) {
//   var l = 0;
//   var r = 0;
//   var k = 0;
//   while (l < lArr.length && r < rArr.length) {
//     if (lArr[l] <= rArr[r]) {
//       mArr[k] = lArr[l];
//       l++;
//     } else {
//       mArr[k] = rArr[r];
//       var swapArr = [-2, lArr[l], rArr[r]];
//       mergeAnimation.push(swapArr);
//       r++;
//     }
//     k++;
//   }
//   for (var i = l; i < lArr.length; i++) {
//     mArr[k] = lArr[i];
//     k++;
//   }
//   for (var i = r; i < rArr.length; i++) {
//     mArr[k] = rArr[i];
//     k++;
//   }
// }
// function animateMerge() {
//   for (var i = 0; i < mergeAnimation.length; i++) {
//     console.log("Array to animate is ->" + mergeAnimation[i]);
//   }
// }
//-------------------------------------------------------------------------------------
function mergeSort() {
  mergeAnimation = [];
  auxArr = [];
  mainArray = [];
  console.log(auxArr + "|" + mergeAnimation + "|" + mainArray + "|" + copyArr);

  mergeSortCall(values, 0, values.length - 1, copyArr);
  copyArr = values;
}
function mergeSortCall(mainArray, start, end, auxArr) {
  if (start == end) {
    return;
  }
  var middle = Math.floor((start + end) / 2);
  mergeSortCall(auxArr, start, middle, mainArray);
  mergeSortCall(auxArr, middle + 1, end, mainArray);
  merge(mainArray, start, middle, end, auxArr);
}

function merge(mainArray, start, middle, end, auxArr) {
  var k = start;
  var i = start;
  var j = middle + 1;
  while (i <= middle && j <= end) {
    mergeAnimation.push([i, j]);
    // mergeAnimation.push([i, j]);
    if (auxArr[i] <= auxArr[j]) {
      mergeAnimation.push([k, auxArr[i]]);
      mainArray[k] = auxArr[i];
      i++;
    } else {
      mergeAnimation.push([k, auxArr[j]]);
      mainArray[k] = auxArr[j];
      j++;
    }
    k++;
  }
  while (i <= middle) {
    mergeAnimation.push([i, i]);
    // mergeAnimation.push([i, i]);
    mergeAnimation.push([k, auxArr[i]]);
    mainArray[k] = auxArr[i];
    i++;
    k++;
  }
  while (j <= end) {
    mergeAnimation.push([j, j]);
    // mergeAnimation.push([j, j]);
    mergeAnimation.push([k, auxArr[j]]);
    mainArray[k] = auxArr[j];
    j++;
    k++;
  }
}
function animateMerge() {
  initArr();
  mergeSort();
  var i = 0;
  var mergeA = setInterval(function() {
    if (i >= mergeAnimation.length - 1) {
      console.log("After animation  ");
      enableButtons();
      clearInterval(mergeA);
    }
    var li = mergeAnimation[i][0];
    var lj = mergeAnimation[i][1];
    if (i % 2 == 0) {
      setTimeout(function() {
        clearCanvas();
        for (var k = 0; k < displayArr.length; k++) {
          if (k == li || k == lj) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "black";
          }
          ctx.fillRect(
            (k + 1) * spaceBtwBars - 10,
            canvas.height - displayArr[k],
            barWidth,
            displayArr[k]
          );
        }
      }, timeAlgo);
    } else {
      setTimeout(function() {
        displayArr[li] = lj;
      }, timeAlgo);
    }
    i++;
  }, timeAlgo);
  clearCanvas();
  setTimeout(function() {
    clearCanvas();
    for (var k = 0; k < displayArr.length; k++) {
      displayArr[mergeAnimation[mergeAnimation.length - 1][0]] =
        mergeAnimation[mergeAnimation.length - 1][1];
      ctx.fillStyle = "black";
      ctx.fillRect(
        (k + 1) * spaceBtwBars - 10,
        canvas.height - displayArr[k],
        barWidth,
        displayArr[k]
      );
    }
    //console.log("I ran" + displayArr);
  }, (mergeAnimation.length + 2) * timeAlgo);
}
//---------------------------------------------------------------------------------------------

function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  var index = partition(arr, start, end);
  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
}
function partition(arr, start, end) {
  var pIndex = start;
  var pivot = arr[end];
  for (var i = start; i < end; i++) {
    if (arr[i] <= pivot) {
      swapQS(i, pIndex, arr);
      quickAnimation.push([pIndex, i, end, "swap"]);
      pIndex++;
    } else {
      quickAnimation.push([pIndex, i, end, "no"]);
    }
  }
  swapQS(pIndex, end, arr);
  quickAnimation.push([pIndex, -1, end, "big"]);
  //console.log(arr);
  return pIndex;
}
function swapQS(a, b, arr) {
  //console.log(arr + "|");
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
function animateQuick() {
  initArr();
  quickSort(values, 0, values.length - 1);
  var i = 0;
  var qq = setInterval(function() {
    if (i >= quickAnimation.length - 1) {
      console.log("After Animation");
      enableButtons();
      clearInterval(qq);
    }
    var pivotPt = quickAnimation[i][0];
    var iCmp = quickAnimation[i][1];
    var pivotEl = quickAnimation[i][2];
    var swapB = quickAnimation[i][3];
    if (swapB === "swap") {
      setTimeout(function() {
        clearCanvas();
        for (var k = 0; k < qArr.length; k++) {
          if (k == pivotPt) {
            ctx.fillStyle = "yellow";
          } else if (k == iCmp || k == pivotEl) {
            ctx.fillStyle = "purple";
          } else {
            ctx.fillStyle = "black";
          }
          ctx.fillRect(
            (k + 1) * spaceBtwBars - 10,
            canvas.height - qArr[k],
            barWidth,
            qArr[k]
          );
        }
      }, timeAlgo);
      setTimeout(function() {
        var temp = qArr[pivotPt];
        qArr[pivotPt] = qArr[iCmp];
        qArr[iCmp] = temp;
      }, timeAlgo);
    } else if (swapB === "no") {
      setTimeout(function() {
        clearCanvas();
        for (var k = 0; k < qArr.length; k++) {
          if (k == pivotPt) {
            ctx.fillStyle = "yellow";
          } else if (k == iCmp || k == pivotEl) {
            ctx.fillStyle = "green";
          } else {
            ctx.fillStyle = "black";
          }
          ctx.fillRect(
            (k + 1) * spaceBtwBars - 10,
            canvas.height - qArr[k],
            barWidth,
            qArr[k]
          );
        }
      }, timeAlgo);
    } else if (swapB === "big") {
      setTimeout(function() {
        clearCanvas();
        for (var k = 0; k < qArr.length; k++) {
          if (k == pivotEl || k == pivotPt) {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "black";
          }
          ctx.fillRect(
            (k + 1) * spaceBtwBars - 10,
            canvas.height - qArr[k],
            barWidth,
            qArr[k]
          );
        }
      }, timeAlgo);
      setTimeout(function() {
        var temp = qArr[pivotPt];
        qArr[pivotPt] = qArr[pivotEl];
        qArr[pivotEl] = temp;
      }, timeAlgo);
    }
    i++;
  }, timeAlgo);
  clearCanvas();
  setTimeout(function() {
    clearCanvas();
    for (var k = 0; k < qArr.length; k++) {
      ctx.fillStyle = "black";
      ctx.fillRect(
        (k + 1) * spaceBtwBars - 10,
        canvas.height - qArr[k],
        barWidth,
        qArr[k]
      );
    }
  }, (quickAnimation.length + 2) * timeAlgo);
}
function callRespectiveSort(str) {
  disableButtons();
  if (str == "Bubble") {
    bubbleSort();
  }
  if (str == "Selection") {
    selectionSort();
  }
  if (str == "Merge") {
    animateMerge();
  }
  if (str == "Quick") {
    animateQuick();
  }
}
function enableButtons() {
  document.getElementById("populationCtr").disabled = false;
  document.getElementById("BubbleCtr").disabled = false;
  document.getElementById("SelectionCtr").disabled = false;
  document.getElementById("MergeCtr").disabled = false;
  document.getElementById("QuickCtr").disabled = false;
  document.getElementById("timeTaken").disabled = false;
}
function disableButtons() {
  document.getElementById("populationCtr").disabled = true;
  document.getElementById("BubbleCtr").disabled = true;
  document.getElementById("SelectionCtr").disabled = true;
  document.getElementById("MergeCtr").disabled = true;
  document.getElementById("QuickCtr").disabled = true;
  document.getElementById("timeTaken").disabled = true;
}
