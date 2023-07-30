function addLeadingZeros(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
};

const expiredOTP = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + "-" + addLeadingZeros(currentDate.getMonth() + 1) + "-" + addLeadingZeros(currentDate.getDate()) + " " + addLeadingZeros(currentDate.getHours()) + ":" + addLeadingZeros(currentDate.getMinutes() + 4) + ":" + addLeadingZeros(currentDate.getSeconds());

    return formattedDate;
};

module.exports = {
    expiredOTP
};