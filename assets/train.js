$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyC-m0mAh0tU9OlxcmLNaj9NeU-GIo6zYr4",
        authDomain: "classproject1-6b207.firebaseapp.com",
        databaseURL: "https://classproject1-6b207.firebaseio.com",
        projectId: "classproject1-6b207",
        storageBucket: "classproject1-6b207.appspot.com",
        messagingSenderId: "733605793926"
    };
    firebase.initializeApp(config);
    var database = firebase.database()




    $(".btn-primary").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name").val().trim()
        var trainDestination = $("#train-destination").val().trim();
        var firstTrain = $("#first-train-time").val().trim();
        var trainFrequency = $("#train-frequency").val().trim();

        var train = {
            trainName: trainName,
            trainDestination: trainDestination,
            firstTrain: firstTrain,
            trainFrequency: trainFrequency,
        }
        $(".form-control").val("")

        database.ref().push(train)

    });
    setInterval(() => {

        $("tbody").empty()
        database.ref().on("child_added", function (childSnapshot) {
            var trainData = childSnapshot.val();
            //train frequuency
            var tFrequency = trainData.trainFrequency
            var firstTime = trainData.firstTrain



            //train time converted to military time
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            //time right now
            //var currentTime = moment();
            //console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

            //difference between the first departure time and time right now
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % tFrequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = tFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
            nextTrain = moment(nextTrain).format("HH:mm")


            //using string interpolation
            //$("tbody").append(
            // `<tr>
            //  <td>${trainData.trainName}</td>
            //  <td>${trainData.trainDestination}</td>
            //  <td>${trainData.trainFrequency}</td>
            //  <td>${trainData.nextTrain}</td>
            //  <td>${trainData.tMinutesTillTrain}</td>

            //  </tr>`
            // )

            //using string concatination
            $("tbody").append(
                "<tr>" +
                "<td>" + trainData.trainName + "</td>" +
                "<td>" + trainData.trainDestination + "</td>" +
                "<td>" + trainData.trainFrequency + "</td>" +
                "<td>" + nextTrain + "</td>" +
                "<td>" + tMinutesTillTrain + "</td>" +
                "</tr>"

            )
        })


    }, 1000)

})
