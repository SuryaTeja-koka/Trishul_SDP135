var num_rows
var knapsackCapacity

function createTable() {
    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    var theader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Appointments</th> <th scope="col">Amount</th> <th scope="col">Weightage(in hrs)</th></tr>';
    var tbody = '';

    for (var i = 1; i <= num_rows; i++) {

        tbody += '<tbody><tr>';
        tbody += '<td>';
        tbody += 'Appointment ' + i
        tbody += '</td>'
        for (var j = 0; j < 2; j++) {
            tbody += '<td>';
            tbody += '<input type="number" class="form-control" placeholder="Value"/>'
            tbody += '</td>'
        }
        tbody += '</tr></tbody>\n';
    }
    var tfooter = '</table>';
    document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
}



var kpResultantProfitId = document.getElementById("kpResultantProfit")
var kpProfitId = document.getElementById("kpProfit")
var kpWeightId = document.getElementById("kpWeight")
var kpProfitWeightId = document.getElementById("kpProfitWeight")
var kpResultantSolutionId = document.getElementById("kpResultantSolution")

var kp01ResultantProfitId = document.getElementById("kp01ResultantProfit")
var kp01ProfitId = document.getElementById("kp01Profit")
var kp01WeightId = document.getElementById("kp01Weight")

var weightValue, profitValue
var profit = [];
var weight = [];
var profit_weight = []
var tempList = []
var resultantSolution = []
var i, j, knapsackResultantProfit = 0;

function generateResult() {

    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;
    
    knapsackResultantProfit = 0;
    profit = [];
    weight = [];
    profit_weight = []
    tempList = []

    var resultClass = document.getElementsByClassName("result");
    console.log(resultClass.length);
    
    for (i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }

    var tableId = document.getElementById("table")
    for (var i = 1; i <= num_rows; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        tempList.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)        
    }
    knapsack01Algorithm()
    sortLists()

    console.log("profit = " + profit);
    console.log("weight = " + weight);
    console.log("profit/weight = " + profit_weight);
    knapsackAlgorithm()
    console.log(knapsackResultantProfit);

}


function sortLists() {

    // to find profit/weight
    for (i = 0; i < num_rows; i++) {
        profit_weight[i] = (profit[i] / weight[i])
    }       
    console.log(tempList);

    // to sort profit/weight in decreasing order along with profit and weight list
    var list = [];
    for (i = 0; i < num_rows; i++)
        list.push({ 'profit_weight': profit_weight[i], 'profit': profit[i], 'weight': weight[i] });


    list.sort(function (a, b) {
        return ((a.profit_weight > b.profit_weight) ? -1 : ((a.profit_weight == b.profit_weight) ? 0 : 1));
    });

    for (i = 0; i < num_rows; i++) {
        profit_weight[i] = +(list[i].profit_weight).toFixed(3)
        profit[i] = list[i].profit;
        weight[i] = list[i].weight;
    }
}

// 9    4   4   2.5     2.5     2   0.625       >profit/weight
// 18   20  12  25      10      22  5           >profit
// 2    5   3   10      4       11  8           >weight
// 23

// 20, 25, 10, 12, 5, 22, 1 

// applying knapsack algorithm
function knapsackAlgorithm() {

    for (i = 0; i < num_rows; i++) {
        if (weight[i] <= knapsackCapacity) {
            knapsackCapacity -= weight[i]
            knapsackResultantProfit += +profit[i]
            tempList[tempList.indexOf(profit[i])] = 1
        }
        else if(knapsackCapacity != 0) {
            knapsackResultantProfit = +knapsackResultantProfit + +(profit[i] * (knapsackCapacity / weight[i]))
            tempList[tempList.indexOf(profit[i])] = knapsackCapacity + "/" + weight[i]
            knapsackCapacity = 0
        }
        else {
            tempList[tempList.indexOf(profit[i])] = 0
        }
    }

    kpResultantProfitId.innerHTML = +knapsackResultantProfit.toFixed(3)
    kpProfitId.innerHTML = profit
    kpWeightId.innerHTML = weight
    kpProfitWeightId.innerHTML = profit_weight
    kpResultantSolutionId.innerHTML = tempList
}

// applying knapsack 0/1 algorithm
function knapsack01Algorithm() {
    var knapsackTable = new Array(num_rows)
    for (i = 0; i <= num_rows; i++) {

        knapsackTable[i] = Array(knapsackCapacity)
        for (j = 0; j <= knapsackCapacity; j++) {
            knapsackTable[i][j] = 0
        }
    }

    var theader = '<table class="table table-bordered">';
    var tbody = '';

    for (i = 1; i <= num_rows; i++) {
        for (j = 0; j <= knapsackCapacity; j++) {
            if (weight[i - 1] <= j) {
                knapsackTable[i][j] = (Math.max(knapsackTable[i - 1][j], +knapsackTable[i - 1][j - weight[i - 1]] + +profit[i - 1]));
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
            else {
                knapsackTable[i][j] = knapsackTable[i - 1][j]
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
        }
        tbody += '</tr></tbody>\n';
    }

    var tfooter = '</table>';
    document.getElementById('knapsackTable').innerHTML = theader + tbody + tfooter;

    console.log(knapsackTable);
    console.log(knapsackTable[num_rows][knapsackCapacity]);


    kp01ResultantProfitId.innerHTML = knapsackTable[num_rows][knapsackCapacity]
    kp01ProfitId.innerHTML = profit
    kp01WeightId.innerHTML = weight

}