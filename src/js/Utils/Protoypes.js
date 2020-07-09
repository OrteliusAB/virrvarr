import * as d3 from "d3"
import Env from "../Config/Env.js"

/* Add String function to calculate the text field length */
String.prototype.width = function (textStyle) {
    // Set a default value
    if (!textStyle) {
        textStyle = "text"
    }
    const d = d3.select("body")
        .append("div")
        .attr("class", textStyle)
        .attr("style", "position: absolute;float: left;white-space: nowrap;visibility: hidden;")
        .attr("id", "width-test") // tag this element to identify it
        .text(this),
        w = document.getElementById("width-test").offsetWidth
    d.remove()
    return w
}

/* Function to truncate a string */
String.prototype.truncate = function (maxLength, textStyle) {
    maxLength -= Env.ADDITIONAL_TEXT_SPACE
    if (isNaN(maxLength) || maxLength <= 0) {
        return this
    }

    let text = this
    let textLength = this.length
    let textWidth
    let ratio

    while (true) {
        textWidth = text.width(textStyle)
        if (textWidth <= maxLength) {
            break
        }

        ratio = textWidth / maxLength
        textLength = Math.floor(textLength / ratio)
        text = text.substring(0, textLength)
    }

    if (this.length > textLength) {
        return this.substring(0, textLength)
    }
    return this
}