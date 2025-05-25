import { isEqual, isString, map } from "lodash";

// bộ kiểm tra chuỗi
export const regex = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i,
  image: /^\w+\.(jpg|jpeg|png|gif|bmp)$/i,
  char: /[`~!@#$%^&*_|+\-=?;:'",.\\{\\}\\[\]\\\\/]/g,
  time: /^([01]\d|2[0-3]):([0-5]\d)$/,
  date: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/,
  datetime:
    /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4}) ([01]\d|2[0-3]):([0-5]\d)$/,
  timedate:
    /^([01]\d|2[0-3]):([0-5]\d) (0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/,
};

// bộ thích nghi
export const Adapt = {
  removeDiacritics(value = "") {
    return value?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  UTF8: (value: any) => {
    if (!value) return "";
    value = value?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    value = value?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    value = value?.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    value = value?.replace(/o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    value = value?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    value = value?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    value = value?.replace(/đ|d/g, "d");
    value = value?.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    value = value?.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return value;
  },
  String: (value: any) => {
    if (!value) return "";
    // Chỉ loại bỏ các ký tự không phải chữ cái, số, khoảng trắng, *, +, -
    // value = value?.replace(/[^a-zA-Z0-9\s*+-]/g, "");
    value = Adapt.UTF8(value);
    // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
    value = value?.replace(/^\s+|\s+$/g, " ");
    // Chuyển tất cả ký tự thành chữ thường
    value = value?.toLowerCase();
    // Format chuỗi UTF8
    value = Adapt.UTF8(value);
    return value;
  },

  CodeICD: (value: any) => {
    if (!value) return "";
    if (!isString(value)) return "";
    value = value?.replace(/\s/g, "");
    value = Adapt.UTF8(value);
    value = value?.toLowerCase();
    if (isEqual(value, "undefined")) return "";
    return value;
  },
  code: (value: any) => {
    if (!value) return "";
    if (!isString(value)) return "";
    value = value?.replace(regex.char, "");
    value = value?.replace(/\s/g, "");
    value = Adapt.UTF8(value);
    value = value?.toUpperCase();
    return value;
  },

  coverPhone: (str = "") => {
    if (str) {
      const result = str.split("");
      result.splice(3, 4, "*", "*", "*", "*");
      const rs = result.join("");
      return rs;
    } else {
      return str;
    }
  },

  money: (str: any) => {
    if (!str && str !== 0) {
      return;
    }
    const parts = str.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${parts.join(",")} ` + "đ";
  },

  formatPhoneCode: (phone: string, area = "vn") => {
    let pattern = "+84";
    if (isEqual(area, "vn")) pattern = "+84";
    const replacedStr = +phone?.replace(phone.charAt(0), pattern);
    return replacedStr;
  },

  handleNumber: (evt: any) => {
    // const ch = String.fromCharCode(evt.which);
    // if (!/[0-9]/.test(ch)) {
    //   evt.preventDefault();
    // }
    const validKeyForPayment = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      ".",
      "Tab",
    ];

    if (!validKeyForPayment.includes(evt.key)) {
      evt.preventDefault();
    }
  },

  formatDateDDMMYYYY: (date?: string) => {
    if (!date) return "";
    const dateFormat = new Date(date);
    let day: string | number = dateFormat.getDate();
    let month: string | number = dateFormat.getMonth() + 1;
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    return `${day}/${month}/${dateFormat.getFullYear()}`;
  },
  formatHourHHmm: (date?: string) => {
    if (!date) return "";
    const dateFormat = new Date(date);
    let hour: string | number = dateFormat.getHours();
    let minute: string | number = dateFormat.getMinutes();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${hour}:${minute}`;
  },
  numToRoman: (num = 0) => {
    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";

    for (const numeral of romanNumerals) {
      while (num >= numeral.value) {
        result += numeral.numeral;
        num -= numeral.value;
      }
    }

    return result;
  },
  htmlToText(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  },
};

export function Array2Enum<T extends readonly string[]>(arr: T) {
  return Object.fromEntries(arr.map((key) => [key, key])) as {
    [K in T[number]]: K;
  };
}
// Hàm chuyển đổi arraybuffer thành Base64
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  // Dùng Lodash để giúp ghép nối các ký tự thành chuỗi binary
  const binary = map(bytes, (byte) => String.fromCharCode(byte)).join("");
  // Mã hóa thành Base64
  return btoa(binary); // Hoặc sử dụng base-64 package cho Expo
};
