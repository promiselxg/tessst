"use client";

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
