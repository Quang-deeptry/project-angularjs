// list subject
app
  .controller('subject', function ($scope, $http) {
    $scope.list = [];
    $http.get('db/Subjects.js').then(function (reponse) {
      $scope.list = reponse.data;
    });
  })
  .controller('quizCtrl', function ($scope, $http, $routeParams, quizFactory) {
    $scope.questions = [];
    $scope.name = $routeParams.name;
    $http.get('db/Quizs/' + $routeParams.id + '.js').then(function (reponse) {
      quizFactory.questions = reponse.data;
    });
  })
  .directive('quizdetail', function (quizFactory) {
    return {
      restrict: 'EA',
      templateUrl: 'templates/quizDetail.html',
      link: function (scope, element, attribute) {
        scope.start = function () {
          quizFactory.getQuestions().then(function () {
            scope.id = 0;
            scope.inProgress = true;
            scope.getQuestion();
            scope.answerMode = false;
            scope.quizOver = false;
            scope.again = false;
          });
        };
        scope.reset = function () {
          scope.inProgress = false;
          scope.score = 0;
        };
        scope.list_active = [];
        scope.change = function (option, active) {
          scope.list_active.push(option);
        };
        scope.getQuestion = function () {
          let quiz = quizFactory.getQuestion(scope.id);
          if (quiz) {
            scope.questions = quiz.Text;
            scope.options = quiz.Answers;
            scope.answer = quiz.AnswerId;
          } else {
            scope.quizOver = true;
          }
        };
        scope.list_score = [];
        scope.nextQuestion = function () {
          let ans = $('input[name = answer]:checked').val();
          if (!ans) {
          } else {
            if (ans == scope.answer) {
              // scope.score++;
              console.log(scope.answer);
              console.log(scope.id);
            }
            scope.id++;
            scope.getQuestion();
          }
        };
        scope.prevQuestion = function () {
          let ans = $('input[name = answer]:checked').val();
          if (scope.id == 0) {
            console.log(scope.id);
          } else {
            scope.id--;
            scope.getQuestion();
          }
        };
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        scope.endQuiz = function () {
          async function timeOut() {
            if (scope.score <= 5) {
              scope.messager = [
                {
                  alert: 'danger',
                  totalScore: 'Bạn học quá kém. Cố gắng học tập thêm nhé',
                },
              ];
            } else if (scope.score > 5 && scope.score < 10) {
              scope.messager = [
                {
                  alert: 'primary',
                  totalScore: 'Điểm của bạn khá là tốt cố gắng thêm nhé',
                },
              ];
            } else if (scope.score == 10) {
              scope.messager = [
                {
                  alert: 'success',
                  totalScore: 'Bạn giỏi quá cố gắng phát huy nữa nha',
                },
              ];
            }
            scope.again = true;
          }

          timeOut();
        };
        scope.quizAgain = function () {
          async function load() {
            $('.main').css('display', 'none');
            let img = `<img src='images/giphy.gif'>`;
            $('#dialog').html(img);
            await sleep(3000);
            location.reload();
          }
          load();
        };
        scope.reset();
      },
    };
  })
  .factory('quizFactory', function ($http, $routeParams) {
    return {
      getQuestions: function () {
        return $http.get('db/Quizs/' + $routeParams.id + '.js').then(function (reponse) {
          questions = reponse.data;
        });
      },
      getQuestion: function (id) {
        const count = 10;
        if (id < count) {
          return questions[id];
        }
      },
    };
  });
