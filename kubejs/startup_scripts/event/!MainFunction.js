// priority: 100

let NativeEvent = {
	/**
	  * 
	  * @template T
	  * @param {T} event 
	  * @param {Internal.Consumer_<InstanceType<T>>} handler 
	  * @returns
	  */
	of(event, handler) {
		NativeEvents.onEvent(event, handler)
	}
}