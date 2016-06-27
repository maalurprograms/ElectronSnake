$(function(){

    var FieldSize = 50;
    var Field = [];
    var SnakePath = [new Point(0,0)];
    var SnakeHead = SnakePath[0];
    var Food;
    var Direction = "d";
    var SnakeSize = 0;

    function main() {
        generateField();
        setSnake();
        setFood();
        $(document).keypress(function (e) {
            switch (String.fromCharCode(e.which)){
                case "w":
                    Direction = 'u';
                    break;
                case "s":
                    Direction = 'd';
                    break;
                case "a":
                    Direction = 'l';
                    break;
                case "d":
                    Direction = 'r';
                    break;
            }
        });
        mainloop();
    }

    function mainloop() {
        repaintPlane();
        repaintSnake();
        setTimeout(mainloop,200);
    }
    
    function repaintPlane() {
        for (var i = 0; i<Field.length;i++){
            for(var j = 0; j<Field[i].length; j++){
                if(!Food.equals(new Point(j,i))) Field[i][j].css('background-color','#FFF');
            }
        }
    }

    function generateField() {
        for(var i = 0; i < FieldSize; i++){
            var content = "<tr id='tr_"+i+"'>";
            for(var j = 0 ; j < FieldSize; j++){
                content += "<td class='field' id='td_"+j+"'></td>";
            }
            content += "</tr>";
            $('#matrix').append(content);
            var tmp = [];
            $("#tr_"+i).children().each(function () {
               tmp.push($(this))
            });
            Field[i] = tmp;
        }
    }
    
    function setSnake() {
        Field[SnakeHead.y][SnakeHead.x].css("background-color", "#0F0");
    }
    
    function repaintSnake() {
        switch (Direction){
            case 'u':
                SnakeHead = new Point(SnakeHead.x, SnakeHead.y-1);
                break;
            case 'd':
                SnakeHead = new Point(SnakeHead.x, SnakeHead.y+1);
                break;
            case 'l':
                SnakeHead = new Point(SnakeHead.x-1, SnakeHead.y);
                break;
            case 'r':
                SnakeHead = new Point(SnakeHead.x+1, SnakeHead.y);
                break;
        }
        SnakePath.push(SnakeHead.clone());
        try{
            Field[SnakeHead.y][SnakeHead.x].css("background-color", "#0F0");
            for (var i = 1; i <= SnakeSize; i++){
                Field[SnakePath[(SnakePath.length-1)-i].y][SnakePath[(SnakePath.length-1)-i].x].css("background-color", "#0F0");
            }
        }
        catch(e){
            alert("Sie haben Verloren!");
            reset();
        }
        if (Food.equals(SnakeHead)) {
            SnakeSize++;
            setFood();
        }
    }

    function reset() {
        for (var i = 0; i<Field.length;i++){
            for(var j = 0; j<Field[i].length; j++){
                Field[i][j].css('background-color','#FFF');
            }
        }
        SnakePath = [new Point(0,0)];
        SnakeHead = SnakePath[0];
        Food;
        Direction = "d";
        SnakeSize = 0;
        setSnake();
        setFood();
    }

    function setFood() {
        Food = new Point(getRandom(0,FieldSize), getRandom(0,FieldSize));
        Field[Food.y][Food.x].css("background-color", "#F00");
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.equals = function (point) {
            return (this.x == point.x && this.y == point.y);
        };
        this.clone = function () {
            return new Point(this.x, this.y);
        }
    }

    main();
});