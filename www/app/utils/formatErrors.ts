import { ParserError } from "../components/Parser";

const MAX_USIZE = 4294967295;

interface Err{
    msg: string;
    pos: number;
}

export const formatErrors = (errors: ParserError, input: string) => {
    const mapped: Err[] = errors.errors.map((e, i) => ({
        msg: stripPosition(e),
        pos: errors.positions[i] < MAX_USIZE? errors.positions[i] -1 : getPositionForInconsistentExtension(e, input),
    }));
    mapped.sort((a, b) => b.pos - a.pos);

   return buildStr(mapped)
}

const buildStr = (errors: Err[]) => {
    let s = "";
    const ps = errors.map(e => e.pos);
    for (let k = 0; k < errors.length; ++k){
        const symbol = "│";
        // if (k == 0){
        //     symbol = "╿"
        // }
        s += `\n`;
        for(let i = 0; i < errors[k].pos; ++i){
            if(ps.includes(i)){
                s += symbol;
            }else{
                s+=" ";
            }
        }
        s += "╰";
        for (let j = errors[k].pos; j < (errors[0].pos) + 4; ++j){
            s+="─"; //"┖─"
        }
        s += `╼ ${errors[k].msg}`;
    }
    return s;
}

const  stripPosition = (e: string) => {
    const hasPosition = e.indexOf("at position");
    if(hasPosition >= 0){
        return e.slice(0, hasPosition);
    }
    return e
};

const getPositionForInconsistentExtension = (e: string, input: string) => {
    const key = "Inconsistent extension: ";
    const hasInconsistentE = e.indexOf(key);
    if (hasInconsistentE >= 0){
        return input.lastIndexOf(e.slice(key.length));
    }
    return 0;
}