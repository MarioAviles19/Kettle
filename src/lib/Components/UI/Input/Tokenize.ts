

export class Tokenizer{


    units = ["tbs", "oz"]


    Parse(str : string){
        let tokens : any[] = [];
        let currentToken = "";

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            currentToken += char.trim();
            //If the current character is whitespace or it is the end of the line, add token to array
            if(char.trim() === "" || i == str.length - 1){
                console.log(currentToken)

                if(currentToken.toString().toLowerCase() === "of"){
                    if(!tokens.some(val=>{return val.interstitial == true})){
                        tokens.push({
                            text : currentToken,
                            interstitial : true
                        })
                    } else {
                        tokens.push({
                            text : currentToken,
                            isItem : true
                        })
                    }

                } else if(this.units.some(val=>{return val === currentToken.toString().toLowerCase()})){
                    //If there is already a quantity check if the current token is a unit, then continue
                    //TODO: Consider coupling these
                    //Maybe check if the last item in the token array is a quantity and then add itself to that token? 
                    if(tokens.some(t=>{return t.isQuantity == true})){
                        //Add token
                        tokens.push({
                            text : currentToken,
                            isUnit : true
                        })
                    } 
                
                } else if (parseInt(currentToken)){
                    //If the next char is a number or slash, continue
                    if(str[i+1] === "/" || parseInt(str[i+1] || "")){
                        continue
                    }
                        //Add token
                        tokens.push({
                            text : currentToken,
                            isQuantity : true
                        })
                        currentToken = "";
                }
                else if(currentToken.length > 0){
                    tokens.push({
                        text : currentToken,
                        isItem : true
                    });
                }
                currentToken = ""
                console.log({currentToken})
            }

            
        }
        console.log(tokens)
        return tokens;
    }
}