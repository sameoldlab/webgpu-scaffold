import shader from './shaders/color_triangle.wgsl?raw'

async function initWebGPU(canvas: HTMLCanvasElement) {
	if (!navigator.gpu) throw Error('WebGPU not available')

	canvas.height = window.innerHeight * devicePixelRatio
	canvas.width = window.innerWidth * devicePixelRatio
	const size = { width: canvas.width, height: canvas.height }
	document.body.appendChild(canvas)

	const adapter = await navigator.gpu.requestAdapter()
	if (!adapter) throw new Error('No Adapter Found')

	const device = await adapter.requestDevice()
	const format = 'bgra8unorm' as GPUTextureFormat

	const context = canvas.getContext('webgpu')
	if (!context) throw new Error('No Context Found')
	context?.configure({
		device,
		format,
		alphaMode: 'opaque',
	})
	return { device, context, format, size }
}

function initPipeline(
	device: GPUDevice,
	format: GPUTextureFormat
) {
	return device.createRenderPipeline({
		layout: 'auto',
		vertex: {
			module: device.createShaderModule({
				code: shader,
			}),
			entryPoint: 'vert_main',
		},
		fragment: {
			module: device.createShaderModule({
				code: shader,
			}),
			entryPoint: 'frag_main',
			targets: [{ format }],
		},
		primitive: {
			topology: 'triangle-list',
		},
	})
}

function execDraw(device: GPUDevice, context:GPUCanvasContext, pipeline: GPURenderPipeline) {
	const commandEncoder = device.createCommandEncoder()
	const view = context.getCurrentTexture().createView()

	const renderpass = commandEncoder?.beginRenderPass({
		colorAttachments: [
			{
				view,
				loadOp: 'clear',
				storeOp: 'store',
				clearValue: { r: .25, g: .25, b: .25, a: 1.0 },
			},
		],
	})

	renderpass.setPipeline(pipeline)
	renderpass.draw(3, 1, 0, 0)
	renderpass.end()

	device?.queue.submit([commandEncoder.finish()])
}

async function main() {
	const canvas = document.createElement('canvas')
	const { device, context, format } = await initWebGPU(canvas)

	const pipeline = initPipeline(device, format)
	execDraw(device, context, pipeline)

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth * devicePixelRatio
		canvas.height = window.innerHeight * devicePixelRatio
		// don't need to recall context.configure() after v104
		execDraw(device, context, pipeline)
	})
}

main()