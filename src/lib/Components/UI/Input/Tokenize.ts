
interface Token{
    text : string,
    isQuantity? : boolean,
    unit? : string,
    isUnit? : boolean
    isItem? : boolean,
    isInterstitial? : boolean
}
export type Unit =
            'tsp' | 'tsps' | 'tbsp' | 'tbsp' | 'tbs' | 'c' | 'cup' | 'cups' | 'ml' | 
            'ml' | 'l' | 'l' | 'fl oz' | 'fl oz' | 'qt' | 'qts' | 'pt' | 
            'pts' | 'gal' | 'gals' |
            'g' | 'gs' | 'kg' | 'kgs' | 'oz' | 'ozs' | 'lb' | 'lbs' | 'mg' | 'mgs'

export class Tokenizer{


    units = [
        // Volume
        'tsp', 'tsps', 'tbsp', 'tbsp', 'tbs', 'c', 'cup', 'cups', 'ml', 
        'ml', 'l', 'l', 'fl oz', 'fl oz', 'qt', 'qts', 'pt', 
        'pts', 'gal', 'gals',
      
        // Weight
        'g', 'gs', 'kg', 'kgs', 'oz', 'ozs', 'lb', 'lbs', 'mg', 'mgs'
      ];


    Parse(str : string){
        let tokens : Token[] = [];
        let currentToken = "";

        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            currentToken += char.trim();
            //If the current character is whitespace or it is the end of the line, add token to array
            if(char.trim() === "" || i == str.length - 1){

                if(currentToken.toString().toLowerCase() === "of"){
                    if(!tokens.some(val=>{return val.isInterstitial == true})){
                        tokens.push({
                            text : currentToken,
                            isInterstitial : true
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

                        //if the last token was a quantity, add this unit to that token
                        const lastToken = tokens[tokens.length - 1];
                        if(lastToken.isQuantity){
                            lastToken.unit = currentToken.toString().toLowerCase()
                        } else{

                            //Add token
                            tokens.push({
                                text : currentToken,
                                isUnit : true
                            })
                        }
                    } 
                
                } else if (parseInt(currentToken)){
                    //If the next char is a number or slash, continue
                    if(str[i+1] === "/" || parseInt(str[i+1])){
                        currentToken += " ";

                        continue
                    }
                    //Or if the next character is a space and then a number e.g. '1 1/2'
                    if(str[i + 1]?.trim() === "" && parseInt(str[i + 2])){
                        //Add a space since the space will be trimmed
                        currentToken += " ";
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
            }

            
        }
        return tokens;
    }
}