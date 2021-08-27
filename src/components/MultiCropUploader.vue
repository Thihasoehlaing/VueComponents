<template>
	<div class="w-full" :id="id" :name="name">
		<div 
			class="px-3 py-2 border-2 border-gray-300 border-dashed rounded-md"
		>
			<div class="space-y-2 ">
				<div class="grid grid-cols-4 gap-2" v-if="crop.image.length > 0">
					<div
						v-for="(img, index) in crop.image"
						v-bind:key="index"
						class="col-span-1"
					>
						<div 
							class="cursor-pointer text-center p-1 border rounded"
							@click="previewModal(index)"
						>
							<img 
								:src="img"
								:class="imgClass"
							>
						</div>
						<div class="flex mt-2 justify-center">
							<span class="relative z-0 inline-flex shadow-sm rounded-md">
								<button 
							    	type="button" 
							    	class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							    	@click="removeUncropFile(index)"
							    >
							      	<span class="sr-only">Remove</span>
							      	Remove
							    </button>
							    <button 
							    	type="button" 
							    	class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
							    	@click="openCropModal(index)"
							    >
							      	<span class="sr-only">Crop</span>
							      	Crop
							    </button>
							</span>
						</div>
					</div>
					<div
						class="my-auto ml-2"
	  					v-if="crop.file.length > 0"
					>
						<label 
	                    	for="add-file" 
	                    	class="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 text-sm"
	                    >
	                      	<button 
	                      		@click="addFile"
	                      		class="px-3 py-2 bg-green-100 rounded-lg" 
	                      	>
	                      		Add a Photo
	                      	</button>
	                      	<input 
	                      		:id="id + 'add-file'" 
	                      		name="add-file" 
	                      		type="file" 
	                      		class="sr-only"
	                      		@change="processAddFile($event)"
	                      		multiple
	                      	/>
	                    </label>
					</div>
				</div>

				<svg
					v-if="crop.file.length < 1"
					class="mx-auto h-12 w-12 text-gray-400" 
					stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"
				>
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  				</svg>
  				<div
  					class="justify-center text-center text-sm text-gray-600"
  					v-if="crop.file.length < 1"
  				>
                    <label 
                    	for="file-upload" 
                    	class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 "
                    >
                      	<button 
                      		@click="showFile"
                      		class="px-3 py-2 bg-indigo-100 rounded-lg" 
                      	>
                      		Upload a Photo
                      	</button>
                      	<input 
                      		:id="id + 'file-upload'"
                      		name="file-upload" 
                      		type="file" 
                      		class="sr-only"
                      		@change="processFile($event)"
                      		multiple
                      	/>
                    </label><br>
                    <p class="text-xs text-gray-500 mt-3">
        				PNG, JPG, GIF up to 10MB
      				</p>
                </div>
			</div>
		</div>

		<v-modal 
			id="crop"
			:showing="modal.crop" 
			@close="closeCropModal"
			:showClose="true"
			:closeIfShown="true"
		>
			<div class="grid grid-cols-3" v-if="selectedImage">
				<div class="col-span-2">
					<cropper
						v-if="selectedImage"
						class="cropper"
						ref="cropper"
						:src="selectedImage.image"
						:stencil-props="stencilProps"
						:resize-image="{
							adjustStencil: false
						}"
						:autoZoom="false"
						image-restriction="stencil"
						@change="onChange"
					/>
				</div>
				<div class="col-span-1 px-5">
					<preview
						class="border rounded"
						:width="120"
						:height="120"
						:image="result.image"
						:coordinates="result.coordinates"
					/>
				</div>
			</div>
			<div class="w-full text-right">
				<button 
					@click="cropImage"
					class="px-5 py-2 bg-green-500 text-white rounded-lg"
				>
					Crop
				</button>
			</div>
		</v-modal>

		<v-modal 
			id="preview"
			:showing="modal.preview" 
			@close="closePreview"
			:showClose="true"
			:closeIfShown="true"
		>
			<div class="w-full">
				<img 
					:src="preview.image"
					v-if="preview.image"
					class="" 
				>
			</div>

			<div class="mt-2 w-full text-right">
				<button 
					class="text-center w-56 py-2 rounded-lg focus:outline-none bg-gray-300 text-black"
					@click="closePreview"
				>
					<span class="text-sm font-normal">
						Close
					</span>
				</button>
			</div>
		</v-modal>

	</div>
</template>

<style>
	.cropper {
		height: 400px;
		background: #DDD;
	}
</style>

<script>
	import helper from "../utils/helper";
	import { Cropper,Preview } from 'vue-advanced-cropper'
	import 'vue-advanced-cropper/dist/style.css';

	import VueTailwindModal from "vue-tailwind-modal";

	export default {
		name: "MultiCropUploader",

		components:{
			'v-modal': VueTailwindModal,
			Cropper,
			Preview
		},

		props:{
			stencilProps:{
				type: Object,
				required: false,
				default: () => {
					return {
						handlers: {},
						movable: true,
						scalable: true,
						aspectRatio: 16/9,
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

		data(){
			return{
				helper,
				file: [],
				add:[],
				addImage:[],
				image: [],
				modal:{
					preview: false,
					crop: false
				},
				crop: {
					file: [],
					image: [],
				},
				result:{
					coordinates: null,
					image: null
				},
				selectedImage: {
					index: null,
					image: null
				},
				preview:{
					index: null,
					image: null
				}
			};
		},

		mounted(){
			if(this.preset){
				this.file = helper.cloneJson(this.preset);
				this.image = helper.cloneJson(this.preset);
				this.crop.file = this.file;
				this.crop.image = this.image;
			}
		},

		methods:{
			showFile(){
				document.getElementById(this.id +"file-upload").click();
			},

			addFile(){
				document.getElementById(this.id + "add-file").click();
			},

			removeUncropFile(key){
				delete this.file[key];
				delete this.image[key];
				delete this.crop.file[key];
				delete this.crop.image[key];

				this.file = this.file.filter(item => item);
				this.image = this.image.filter(item => item);
				this.crop.file = this.crop.file.filter(item => item);
				this.crop.image = this.crop.image.filter(item => item);

				this.emit();
			},

			removeBeforeCrop(){
				this.file = [];
				this.image = [];
			},

			openCropModal(key){
				this.selectedImage.index = key;
				this.selectedImage.image = this.crop.image[key];
				this.modal.crop = true;
			},

			closeCropModal(){
				this.selectedImage.index = null;
				this.selectedImage.image = null;
				this.modal.crop = false;
			},

			processFile(event) {
				var newFileList = Array.from(event.target.files);
				this.file = newFileList;

				if(this.crop.file.length > this.maxFilesize)
				{
					window.toastr.warn("Max File Size Reached");
				} else {
					this.crop.file = this.file;
					this.image = this.file.map(item => {
						console.log("item",item);
						return URL.createObjectURL(item)
					});
					this.crop.image = this.image;
				}
				
				this.emit();
  			},

  			processAddFile(event){

  				var addFileList = Array.from(event.target.files);
  				this.add = addFileList;

  				for (var i = 0; i < this.add.length; i++) {
  					this.file.push(this.add[i]);
  				}

  				if(this.crop.file.length > this.maxFilesize)
				{
					window.toastr.warn("Max File Size Reached");
				} else {
					this.crop.file = this.file;
					this.addImage = this.add.map(item => {
						return URL.createObjectURL(item)
					});

					for (var i = 0; i < this.addImage.length; i++) {
	  					this.image.push(this.addImage[i]);
	  				}

					this.crop.image = this.image;
					this.emit();
				}
  			},

  			emit(){
  				this.$emit("uploaded", this.crop.file, this.crop.image);
  			},

  			previewModal(key){
  				this.preview.index = key;
				this.preview.image = this.crop.image[key];
  				this.modal.preview = true;
  			},

  			closePreview(){
  				this.preview.index = null;
				this.preview.image = null;
  				this.modal.preview = false;
  			},

  			onChange({ coordinates, image }) {
				this.result = {
					coordinates,
					image
				};
			},

			cropImage(){
				const { coordinates, image, canvas } = this.$refs.cropper.getResult();

				this.crop.image[this.selectedImage.index] = canvas.toDataURL();

				var file = this.dataURItoBlob(this.crop.image[this.selectedImage.index]);
				this.crop.file[this.selectedImage.index] = file;

				this.emit();
				this.closeCropModal();
			},

			dataURItoBlob(dataURI){
				var byteString = atob(dataURI.split(',')[1]);
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);
				for (var i = 0; i < byteString.length; i++) {
				  ia[i] = byteString.charCodeAt(i);
				}
				var blob = new Blob([ia], {
				  type: 'image/jpeg'
				});
				var file = new File([blob], "image.jpg");

				return file;
			},
		}
	};
</script>