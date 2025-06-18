class Report {
  #id;
  #created;
  #updated;
  #parameter;
  #val;
  #quality;
  #divideBy;
  #isMoved;
  #product1;
  #product2;

  constructor(
    id,
    created,
    updated,
    parameter,
    val,
    quality,
    divideBy,
    isMoved,
    product1,
    product2,
  ) {
    this.#id = id;
    this.#created = created;
    this.#updated = updated;
    this.#parameter = parameter;
    this.#val = val;
    this.#quality = quality;
    this.#divideBy = divideBy;
    this.#isMoved = isMoved;
    this.#product1 = product1;
    this.#product2 = product2;
  }
}
