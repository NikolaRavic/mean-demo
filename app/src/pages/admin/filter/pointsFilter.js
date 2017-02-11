(function () {
    'use strict';

    angular.module('adminApp')
        .filter("pointsFilter", function () {

            return function (input, threshold, condition) {
                var output = [];

                if (!angular.isArray(input) || condition === -2) {
                    return input;
                } else if (condition === -1) {
                    console.log("debug2");
                    input.forEach(function (item) {
                        if (item.points > threshold) {
                            output.push(item);
                        }
                    });
                    return output;

                } else if(condition > -1){
                    input.forEach(function (item) {
                        if (item.points === condition) {
                            output.push(item);
                        }

                    });
                    return output;
                }
            };
        });


}());