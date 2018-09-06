
        //Declare Arrays
        var Movies = ["the godfather", "citizen kane","pulp fiction","psycho","apocalypse now","schindlers list","taxi driver","jaws","singin in the rain","goodfellas","the dark knight","star wars","its a wonderful life","gone with the wind","the wizard of oz","forest gump","saving private ryan","toy story","titanic","the lord of the rings","harry potter","back to the future","annie hall","the matrix"]
        var TV = ["game of thrones","breaking bad","the big bang theory","stranger things","the simpsons","american horror story","better call saul","the office","arrested development","parks and rec"]
        var Music = ["beyonce","jay z","elvis presley","drake","michael jackson","taylor swift","eminem","madonna","lady gaga","ed sheeran","david bowie","queen","the beatles","the rolling stones","led zepplin","the who","the doors","prince"]
        var Cities = ["dallas","houston","new york city","san diego","denver","orlando","miami","portland","seattle","raleigh","atlanta","chicago","new orleans","charlotte","austin","los angeles","san francisco","san antonio","philadelphia"]
        var States = ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','district of columbia','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new hampshire','new jersey','new mexico','new york','north carolina','north dakota','ohio','oklahoma','oregon','pennsylvania','rhode island','south carolina','south dakota','tennessee','texas','utah','vermont','virginia','washington','west virginia','wisconsin','wyoming']
        var Countries = ['argentina','australia','bangladesh','bosnia','brazil','canada','chile','china','colombia','croatia','cuba','czechoslovakia','czech republic','egypt','estonia','finland','france','georgia','germany','greece','hong kong','hungary','india','iran','ireland','israel','italy','japan','mexico','netherlands','new zealand','norway','pakistan','philippines','poland','romania','russia','serbia','slovakia','slovenia','south korea','soviet union','spain','sri lanka','sweden','taiwan','turkey','ukraine','united kingdom','united states','uruguay','venezuela']
        // Declare Attachments to HTML Elements
        var outline = document.getElementById("outline");
        var loses = document.getElementById("loses");
        var wins = document.getElementById("wins");
        var ans = document.getElementById("ans")
        var btns = document.getElementsByClassName("catButtons")
        var hangmanImg = document.getElementById("hangmanImg")
        var gLeft = document.getElementById("gLeft");
        var cGuesses = document.getElementById("cGuesses");
        //Declare Other Variables
        var wordCount = 0;
        var computerChoice = ''
        var keyFound = false;
        var keyPushed = false;
        var guessArray = []
        var ansArray = []
        //Set original outline textContent
        outline.textContent = 'Select a category to get started'
        //Start Game function, called when a category button is pushed
        //cat variable is depedant on which button was pushed
        function startGame(cat){
            changeImg(6)
            //Declare Initial Count
            gLeft.textContent = 6;
            //determine computers choice
            computerChoice = cat[Math.floor(Math.random() * cat.length)];
            draw()
            //Draw function, within the startGame function, draws outline for choosen word
            function draw(){
                //Reset outline to nothing
                outline.textContent = ""
                //loop over every letter, create outline
                for(i=0;i<computerChoice.length; i++){
                    console.log(computerChoice)
                    //If next character is Space, add two spaces to outline
                    if(computerChoice.charAt(i)===' ') {
                        outline.textContent = outline.textContent + '\xa0\xa0'
                    }
                    //Else add "_ " to outline
                    else {    
                        outline.textContent = outline.textContent + '_ '
                        wordCount++  
                    }
                }
                //log info
                console.log("choosen word:" + computerChoice)
                console.log("total lenght of word: " +computerChoice.length)
                console.log("word count: " +wordCount)
            }
            //When key is pushed (whithin startGame function)
            document.onkeyup = function(e){
                //reset keyPushed value to false
                //keyPush variable determines if a key has already been previously pushed
                keyPushed = false
                //test if user has previously pressed this key
                for(i=0;i<guessArray.length;i++){
                    if(e.key===guessArray[i]){
                        keyPushed = true
                    }
                }
                //if user hasn't previously guessed this key, run the below code
                if(keyPushed == false){
                    //if key that was pressed is a letter, run below code
                    if(e.keyCode>=65 && e.keyCode <=90){
                        //note the pressed key
                        console.log("key pressed: " + e.key)
                        //reset keyFound value to false
                        //keyFound variable is for determining if the pressed key is part of the choosen word, if so, does not -1 from remaining guesses left (gLeft)
                        keyFound = false                  
                        //Check pressed key for if correct
                        for(i=0;i<computerChoice.length;i++){
                            //determine if key pressed equals any key in computer choice's string
                            if(e.key.toLowerCase()===computerChoice.charAt(i)){
                                //declare that user has pressed a correct key (for determining if one should be subtracted from remaining guesses) & subtract one from wordcount
                                keyFound = true;
                                wordCount--; 
                                console.log("Current wordCount: " + wordCount);
                                //replace _ with correct key
                                outline.textContent =replaceAt(outline.textContent, (i*2), e.key);
                            }
                        }
                        //Add to Guess Array (which houses all previous guesses)
                        guessArray.push(e.key)
                        cGuesses.textContent = guessArray
                        //if no key was found -1 from remaining guesses
                        if(keyFound===false){
                        --gLeft.textContent
                        //Change hangman image
                        changeImg(gLeft.textContent)
                        }
                        //if no more letters need to be found, add 1 to win, call reset function
                        if(wordCount===0){
                            console.log("win!")
                            ++wins.textContent
                            Reset()
                        }
                        //if no more guesses remain, add one to lose, call reset function
                        console.log("guesses left" + gLeft.textContent)
                        if(gLeft.textContent==0){
                            console.log("lose")
                            ++loses.textContent
                            Reset()
                        }
                    }
                }
             } 
             //ChangeImg function is to change an image when an incorrect key is pressed
            function changeImg(a) {
                console.log("old image number: " + hangmanImg.src)
                hangmanImg.src = "images/hangman/" + a + ".png"
                console.log("new image number: " + hangmanImg.src)
            }
            //ReplaceAt Function for replacing outline when correct key is pressed
            function replaceAt(string, index, replace) {
                return string.substring(0, index) + replace + string.substring(index + 1);
            }
            //Reset function for new rounds
            function Reset() {
                ansArray.push(computerChoice)
                ans.textContent = ansArray
                wordCount = 0
                changeImg(6)
                computerChoice = cat[Math.floor(Math.random() * cat.length)];
                //if computer's choice is already in the answer array, choose a new word
                var repeat = ansArray.indexOf(computerChoice)
                if(repeat !== -1){
                    console.log("Duplicate word detected:" + computerChoice)
                    computerChoice = cat[Math.floor(Math.random() * cat.length)];
                    console.log("computers word has been reset to " + computerChoice)
                }
                gLeft.textContent = 6;
                guessArray = []
                cGuesses.textContent = guessArray
                draw();
            }
        }
        //When button is pressed, rename title and run the startGame function with the associated variable
        //Could also use jQuery to simlify this, as all buttons have the same class name, renaming them to their variable they push into the startGame function would work
            //Untested jQuery pseudocode
            //$(".catButtons").on("click",function(){
                //$("#gameTitle").text(this + " hangman")
                //wordCount = 0
                //startGame(this)
            //};
        moviesBtn.onclick = function(){
            document.getElementById("gameTitle").textContent = 'Movies Hangman'
            wordCount = 0
            console.log("word count after change: " + wordCount)
            startGame(Movies)
        }
        tvShowBtn.onclick = function(){
            document.getElementById("gameTitle").textContent = 'TV Show Hangman'
            wordCount = 0
            console.log("word count after change: " + wordCount)
            startGame(TV)
        }
        musicBtn.onclick = function(){
            document.getElementById("gameTitle").textContent = 'Music Hangman'
            wordCount = 0
            console.log("word count after change: " + wordCount)
            startGame(Music)
        }
        cityBtn.onclick = function(){
            document.getElementById("gameTitle").textContent = 'US Cities Hangman'
            wordCount = 0
            console.log("word count after change: " + wordCount)
            startGame(Cities)
        }
        countryBtn.onclick = function(){
            document.getElementById("gameTitle").textContent = 'Countries Hangman'
            wordCount = 0
            console.log("word count after change: " + wordCount)
            startGame(Countries)
        }
        stateBtn.onclick = function(){
            document.getElementById("gameTitle").textContent = 'US States Hangman'
            wordCount = 0
            console.log("word count after change: " + wordCount)
            startGame(States)
        }
    
    
        