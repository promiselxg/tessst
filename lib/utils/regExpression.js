"use client";
import sanitizeHtml from "sanitize-html";
import { __ } from "./getElementById";
export function acceptNumbersOnly(el) {
  if (typeof window !== "undefined" && window.document) {
    var tf = __(el);
    tf.value = tf.value.replace(/[^0-9]/g, "");
  }
}

export const phoneRegex = new RegExp(/^(\d{11})$/);
export function validatePhoneNumber(phoneNumber) {
  const phoneRegex = new RegExp(/^(\d{11})$/);
  return phoneRegex.test(phoneNumber);
}

export const capitalizeFirstLetter = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const sanitizeInput = (input) => {
  return sanitizeHtml(input, {
    allowedTags: [
      "p",
      "b",
      "i",
      "em",
      "strong",
      "u",
      "ul",
      "ol",
      "li",
      "br",
      "span",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
    ],
    // allowedAttributes: {
    //   "*": ["style"], // Allows inline styles (if needed, but can be removed for stricter security)
    // },
    allowedStyles: {
      "*": {
        // Allow only certain styles (preventing inline JS execution)
        color: [/^#[0-9A-F]{6}$/i, /^rgb\(/], // Restrict color formats
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
        "font-weight": [/^\d+$/, /^bold$/],
        "font-style": [/^italic$/],
      },
    },
    disallowedTagsMode: "discard",
  });
};
