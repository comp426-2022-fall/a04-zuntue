// where @param s is sides, @param d is number of dice, and @param r is rolls
export default function roll(s, d, r) {
    let results = [];

    //console.log("rolling ", d, " dice with ", s, " sides, ", r, " times.")

    for (let i = 0; i < r; i++) {
        let total = 0;
        for (let j = 1; j < d; j++) {
            total += 1 + Math.floor(Math.random() * s)
        }
        results[i] = total
    }

    return {
        "sides": s, "dice": d, "rolls": r, "results": results
    };
}