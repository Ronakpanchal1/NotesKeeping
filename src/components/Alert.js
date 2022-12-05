import React from 'react'

export default function Alert(props) {
    const capitalize=(word)=>{
        if(word === "danger"){
            word = 'error'
        }
        let newWord = word.toLowerCase()
        let lastWord = newWord.charAt(0).toUpperCase() + newWord.slice(1)
        return lastWord
    }

    return (
        <div style={{ height: "45px" }}>
            {props.alert && <div className={`alert alert-${props.alert.msgType}`} role="alert"> 
                <strong>{capitalize(props.alert.msgType)} :--</strong> {!props.alert.msg?'Write message here':props.alert.msg}
            </div>}
        </div>
    )
}
