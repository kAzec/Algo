class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    var sum = 0;
    var dummy = new ListNode(0, null);
    var current = dummy;
    while (l1 || l2 || sum > 0) {
        sum += (l1?.val ?? 0) + (l2?.val ?? 0);
        current.next = new ListNode(sum % 10, null);
        current = current.next;
        sum = sum >= 10 ? 1 : 0;

        l1 = l1?.next;
        l2 = l2?.next;
    }
    return dummy.next;
};