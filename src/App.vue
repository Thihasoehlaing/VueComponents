<template>
	<div id="app">
		<div class="text-center">
			<h1 class="text-xl font-medium">Multi Files Uploader With Crop</h1>
		</div>

		<div class="mt-5 px-5">
			<multi-crop
				:name="'test'"
      			:id="'test'"
				v-model="form.image"
				class="px-2 py-2"
				:stencilProps="options"
				:preset="form.preset"
				@uploaded="Uploaded"
			></multi-crop>
		</div>

		<div
			v-if="form.imageURL && form.imageURL.length > 0"
			class="mt-2 mx-auto"
		>
			Uploaded Image :

			<ul
				v-for="image in form.imageURL"
				v-bind:key="image"
			>
				<li>{{image}}</li>
			</ul>
		</div>
	</div>
</template>


<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>

<script>
	import helper from './utils/helper.js'
	import MultCropUploader from './components/MultiCropUploader.vue'

	export default {
		name: 'App',

		components: {
			"multi-crop" : MultCropUploader
		},

		data(){
			return{
				helper,
				form:{
					image: [],
					preset: [],//use after fetch data
					imageURL: []
				},
				options:{
					handlers: {},
					movable: true,
					scalable: false,
					aspectRatio: 16/9,// 1 
				},
			};
		},

		mounted(){},

		methods:{
			Uploaded(file,image){
				console.log("file", file, image);
				this.form.image = file;
				this.form.imageURL = image;
			},
		}
	}
</script>