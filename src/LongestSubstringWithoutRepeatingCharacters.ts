function lengthOfLongestSubstring(s: string): number {
    var charToIndices: {[char: string] : number} = {};
    var head = 0;
    var len = 0;
    for (let i = 0; i < s.length; i++) {
        let c = s.charAt(i);
        let previousIdx = charToIndices[c];
        if (previousIdx != undefined && previousIdx >= head) {
            console.log(`Found duplicate char ${c} at ${i}`);
            console.log(`Previous substring ${s.substring(head, i)}`);
            // Found duplicate.
            // Update length.
            len = Math.max(len, i - head);
            console.log(`New length ${len}`);
            // Move head to previousIdx + 1 to drop preivous duplicated element.
            head = previousIdx + 1;
            console.log(`Move head to ${head}`);
        }
        charToIndices[c] = i;
    }
    len = Math.max(len, s.length - head);
    return len;
};

console.log(lengthOfLongestSubstring("aau"));
