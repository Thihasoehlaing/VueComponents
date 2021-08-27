# vue-multiuploader-crop

![ScreenShot](/public/s1.png)

![Screenshot](/public/s2.png)

## Installation
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
## Usage
```
	<div>
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
				image: [], // for files
				preset: [], // use after fetch data from api
				imageURL: [] // cropped images' url 
			},
			options:{
				handlers: {},
				movable: true,
				scalable: false,
				aspectRatio: 16/9,// 1 
			},
		};
	},
	methods:{
		Uploaded(file,image){
			console.log("file", file, image);
			this.form.image = file;
			this.form.imageURL = image;
		},
	}
}
```
### Component
```
props:{
	stencilProps:{
		type: Object,
		required: false,
		default: () => {
			return {
				handlers: {},
				movable: true,
				scalable: true,
				aspectRatio: 16/9, // 1
			};
		}
	},
	preset:{
		type: Array || Object,
		required: false,
	},
	maxFilesize: {
		type: Number,
		required: false,
		default: 5
	},
	imgClass: {
		type: String,
		required: false,
		default: "mx-auto w-60"
	},
	id: {
		type: String,
		required: false,
	},
	name: {
		type: String,
		required: false,
	}
},
```

```
	Giving id is good for parent and child component not to complex emit datas. You can also change props from vue-advanced-cropper 
```


### References

[vue version 2](https://vuejs.org/)
[vue-advanced-cropper](https://www.npmjs.com/package/vue-advanced-cropper)
[TailwindCSS](https://tailwindcss.com/).
