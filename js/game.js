// Moving vehicle

(function () {
    $(document).ready(function () {

        var game = $('#game');

        function times(n, callback) {
            for (var i = 0; i < n; i += 1) {
                callback(i);
            }
        }

        var gameBoard = $('<table>');
        var size = 30;
        var score = 0;

        times(size, function () {
            var tr = $('<tr>');
            times(size, function () {
                var td = $('<td>');
                tr.append(td)
            });
            gameBoard.append(tr).attr('tabindex', 0)
        });

        game.append(gameBoard);
        gameBoard.focus();

        (function addPassengers() {
            var counter = 0;
            var interval = setInterval(function() {
                counter++;
                var x = (Math.floor(Math.random() * size - 1) + 1);
                var y = (Math.floor(Math.random() * size - 1) + 1);
                $('tr:nth-child(' + x + ') td:nth-child(' + y + ')').addClass('passenger');
                if (counter > 10)
                    clearInterval(interval);
                },2000)
        })();

        (function startPositionOfCarAndBuildings() {
            $('tr:nth-child(10) td:nth-child(1)').addClass('car');
            $('tr:nth-child(5) td:nth-child(5)').addClass('building');
            $('tr:nth-child(5) td:nth-child(6)').addClass('building');

        })();

        gameBoard.keydown(function moveCar(event) {
            event.preventDefault();
            var lastPositionOfCar = $(this).find('td.car');
            var nextPositionOfCar;
            var whatKeyIsPressed = event.which || event.keyCode;

            switch (whatKeyIsPressed) {
                case 37:
                    nextPositionOfCar = $(this).find('td.car').prev();
                    checkPossibilityOfMove(nextPositionOfCar, lastPositionOfCar);
                    break;
                case 38:
                    nextPositionOfCar = $(this).find('td.car').parent().prev().find(':nth-child(' + (lastPositionOfCar.index() + 1) + ')');
                    checkPossibilityOfMove(nextPositionOfCar, lastPositionOfCar);
                    break;
                case 39:
                    nextPositionOfCar = $(this).find('td.car').next();
                    checkPossibilityOfMove(nextPositionOfCar, lastPositionOfCar);
                    break;
                case 40:
                    nextPositionOfCar = $(this).find('td.car').parent().next().find(':nth-child(' + (lastPositionOfCar.index() + 1) + ')');
                    checkPossibilityOfMove(nextPositionOfCar, lastPositionOfCar);
                    break;
            }
        });

        function checkPossibilityOfMove(nextPositionOfCar, lastPositionOfCar) {
            if (nextPositionOfCar.hasClass('building') || nextPositionOfCar.length === 0) {
                // do nothing -> break
            }
            else if (nextPositionOfCar.hasClass('passenger')) {
                nextPositionOfCar.removeClass('passenger').addClass('car');
                lastPositionOfCar.removeClass('car');
                score += 1;
                console.log(score);
            }
            else {
                nextPositionOfCar.addClass('car');
                lastPositionOfCar.removeClass('car');
            }
        }

    });
})();