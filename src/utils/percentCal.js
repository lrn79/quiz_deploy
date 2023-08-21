const percentCal = (score, totalList) => {
    const resultPercentage = score * 100 / totalList;
    return resultPercentage.toFixed(2)
};

export default percentCal;
