import Env from "../Config/Env"

export default class VVNode {
	constructor(id, type, name, icon, data, isHidden) {
		//User provided information
		this.id = id
		this.type = type
		this.name = name
		this.icon = icon
		this.data = data

		//Coordinates
		this.x = undefined
		this.y = undefined
		this.relativeX = undefined
		this.relativeY = undefined

		//Fixed coordinates
		this.fx = undefined
		this.fy = undefined

		//Velocity
		this.vx = undefined
		this.vy = undefined

		//Visibility information
		this.isFiltered = false
		this.isHidden = typeof isHidden === "boolean" ? isHidden : false //E.g. imploded

		//Status
		this.isFocused = false

		//Other Meta data
		this.hiddenEdgeCount = 0
		this.shape = null
		this.radius = null
		this.width = null
		this.height = null
		this.relativeWidth = null
		this.relativeheight = null

		//Animation utility properties
		this.sourceX = 0
		this.sourceY = 0
		this.targetX = 0
		this.targetY = 0
		this.originalFx = null
		this.originalFy = null
		this.isAnimating = false

		//D3 index
		this.index = null
	}

	/**
	 * Updates the basic data points of the node after it has been created
	 * @param {string} type - Node type
	 * @param {string} name - Node name
	 * @param {string} icon - Icon URL
	 * @param {boolean} isHidden - Is the node hidden?
	 * @param {any} data - New bound data
	 */
	updateData(type, name, icon, data, isHidden) {
		this.type = type
		this.name = name
		this.icon = icon
		this.data = data
		if (typeof isHidden === "boolean") {
			this.isHidden = isHidden
		}
	}

	/**
	 * Fixates node to a given position in the graph.
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 */
	pin(x, y) {
		this.fx = x
		this.fy = y
	}

	/**
	 * Removes coordinate fixation.
	 */
	unPin() {
		this.fx = null
		this.fy = null
	}

	/**
	 * Repositions node to given coordinates.
	 * @param {number} newX - Target X coordinate
	 * @param {number} newY - Target Y coordinate
	 */
	reposition(newX, newY) {
		this.sourceX = this.x
		this.sourceY = this.y
		this.targetX = newX
		this.targetY = newY
		return this._animate()
	}

	/**
	 * Animates position from source to target
	 */
	_animate() {
		if (!this.targetX || !this.targetY) {
			return Promise.reject("No target coordinates set.")
		}
		return new Promise(resolve => {
			const tween = (startTime, animationTime) => {
				const deltaTime = Date.now() - startTime
				if (deltaTime > animationTime) {
					delete this.targetX
					delete this.targetY
					delete this.sourceX
					delete this.sourceY
					delete this.fx
					delete this.fy
					if (this.originalFx) {
						this.fx = this.originalFx
						delete this.originalFx
					}
					if (this.originalFy) {
						this.fy = this.originalFy
						delete this.originalFy
					}
					delete this.animating
					resolve()
				} else {
					const percentOfAnimation = deltaTime / animationTime
					this.fx = this.sourceX + (this.targetX - this.sourceX) * percentOfAnimation
					this.fy = this.sourceY + (this.targetY - this.sourceY) * percentOfAnimation
					setTimeout(() => tween(startTime, animationTime), 1)
				}
			}
			this.originalFx = this.fx
			this.originalFy = this.fy
			this.fx = this.x
			this.fy = this.y
			this.animating = true
			tween(Date.now(), Env.IMPLOSION_EXPLOSION_ANIMATION_TIME)
		})
	}
}
