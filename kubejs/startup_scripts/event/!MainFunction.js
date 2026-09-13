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

const MBDStartupUtils = {
	traitNameFilter: "traitNameFilter",
	/**
	 * 设置 Java 对象的 private 字段。
	 * @param {any} obj - Java 对象实例
	 * @param {string} fieldName - 字段名 (javap -p 查证)
	 * @param {any} value - 新值 (String→字符串; 数字→number; 枚举/对象→Java 对象)
	 * @returns {void}
	 */
	setPrivateField(obj, fieldName, value) {
		const field = obj.getClass().getDeclaredField(fieldName)
		field.setAccessible(true)
		field.set(obj, value)
	}
}