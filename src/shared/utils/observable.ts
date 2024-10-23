export default abstract class Observable<
  Data,
  Callback extends (data: Data) => void = (data: Data) => void
> {
  private observers: Callback[] = []

  public subscribe(observer: Callback) {
    this.observers.push(observer)
  }

  public unsubscribe(observer: Callback) {
    const index = this.observers.indexOf(observer)
    this.observers.splice(index, 1)
  }

  public notify(data: Data) {
    this.observers.forEach((observer) => observer(data))
  }
}
