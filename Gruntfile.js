module.exports = function(grunt) { //wrapper函数（包装函数）

	//没有matchdep，我们需要为每个依赖关系写grunt.loadNpmTasks('grunt-task-name'),这将很快增加和安装其他插件。
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// LiveReload的默认端口号，你也可以改成你想要的端口号
	var lrPort = 3529;
	// 使用connect-livereload模块，生成一个与LiveReload脚本
	// <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
	var lrSnippet = require('connect-livereload')({
		port: lrPort
	});
	// 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
	var lrMiddleware = function(connect, options) {
		return [
			// 把脚本，注入到静态文件中
			lrSnippet,
			// 静态文件服务器的路径
			connect.static(options.base),
			// 启用目录浏览(相当于IIS中的目录浏览)
			connect.directory(options.base)
		];
	};
	//在这里配置您的GRUNT任务
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), //读取package.json中储存到pkg中
		connect: { // 通过connect任务，创建一个静态服务器
			options: {
				// 服务器端口号
				port: 8000,
				// 服务器地址(可以使用主机名localhost，也能使用IP)
				hostname: 'localhost',
				// 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
				base: '.'
			},
			livereload: {
				options: {
					// 通过LiveReload脚本，让页面重新加载。
					middleware: lrMiddleware
				}
			}
		},
		clean: {
			pre: ['dist/'], //删除掉先前的开发文件
			//post: ['<%= archive_name %>*.zip'] //先删除先前生成的压缩包
		},
		htmlhint: { //静态扫描组件
			build: {
				options: {
					'tag-pair': true, //标签对
					'tag-self-close': false, //不许关闭标签
					'tagname-lowercase': true, //标签名小写
					'attr-lowercase': true, //属性名小写
					'attr-value-double-quotes': true, //属性名双引号
					'attr-no-duplication': true, //属性不能重复
					'attr-value-not-empty': true, //属性不能为空
					'doctype-first': true, // 必须文档声明
					'doctype-html5': true, //文档声明必须是html5
					'spec-char-escape': true,
					'id-unique': true, //ID不能重复
					'head-script-disabled': false,
					'style-disabled': true,
					'img-alt-require': true, //图片 alt必须有
					'src-not-empty': true, //src不能为空
					'style-disabled': false, //是否能有sytle标签
					'csslint': true,
					'jshint': true
				},
				src: ['src/**/*.html', 'dist/**/*.html']
			}
		},
		jshint: { //js检验工具
			files: ['src/**/*.js','!src/js/lib/*.js'], //, 'dist/**/*.js'
			options: {
				globals: {
					jQuery: true, //jquery全局对象暴露
					console: true,
					module: true
				}
			}
		},
		uglify: { //JS压缩
			options: {
				compress: {
					drop_console: true
				},
				banner: '/** \n' +
					'* Project : <%= pkg.name %> \n' +
					'* Author : <%= pkg.author %> \n' +
					'* version : <%= pkg.version %> \n' +
					'* Updated : <%= grunt.template.today() %> \n' +
					'*/ \n'
			},
			build: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.js']
				}
			}
		},
		cssmin: { //css压缩
			options: {
				banner: '/** \n' +
					'* Project : <%= pkg.name %> \n' +
					'* Author : <%= pkg.author %> \n' +
					'* version : <%= pkg.version %> \n' +
					'* Updated : <%= grunt.template.today() %> \n' +
					'*/ \n'
			},
			build: {
				files: {
					'dist/style/<%= pkg.name %>.min.css': ['dist/style/<%= pkg.name %>.css'] // 合并并压缩 path/to 目录下(包含子目录)的所有css文件
				}
			}
			// },
			// minify: {
			// 	expand: true, // 启用下面的选项
			// 	cwd: 'dist/style/', // 指定待压缩的文件路径
			// 	src: ['*.css', '!*.min.css'], // 匹配相对于cwd目录下的所有css文件(排除.min.css文件)
			// 	dest: 'dist/style/', // 生成的压缩文件存放的路径
			// 	ext: '.min.css' // 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
			// }
		},
		concat: { //合并JS/CSS
			options: {
				separator: ';',
				stripBanners: true,
				banner: '/** \n' +
					'* Project : <%= pkg.name %> \n' +
					'* Author : <%= pkg.author %> \n' +
					'* version : <%= pkg.version %> \n' +
					'* Updated : <%= grunt.template.today() %> \n' +
					'*/ \n'
			},
			js: {
				src: ['src/js/*.js', '!src/js/lib/*.js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			css: {
				src: ['src/style/*.css'],
				dest: 'dist/style/<%= pkg.name %>.css'
			}
		},
		watch: { // 通过watch任务，来监听文件是否有更改
			client: {
				// 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: lrPort
				},
				// '**' 表示包含所有的子目录
				// '*' 表示包含所有的文件
				files: ['src/*.html', 'src/**/*.css', 'src/**/*.js', 'src/images/*']
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['htmlhint']
			},
			js: {
				files: ['gruntfile.js', 'src/**/*.js'],
				tasks: ['jshint']
			}
		},
		copy: { //复制文件
			build: {
				files: [{
					expand: true,
					cwd: 'src',
					src: '**/*.html',
					dest: 'dist/',
					flatten: true,
					filter: 'isFile'
				}, {
					expand: true,
					cwd: 'src/js/lib/',
					src: '**',
					dest: 'dist/js/lib/',
					flatten: true,
					filter: 'isFile'
				}]
			}
		},
		imagemin: { //图片压缩
			image: {
				options: {
					progressive: true
				},
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'src/images/', // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest: 'dist/images/' // Destination path prefix
				}]
			}
		},
        usemin: {// 处理html中css、js 引入合并问题
           html: 'dist/**/*.html'
        },
		//压缩最终Build文件夹
		compress: {
			main: {
				options: {
					archive: '<%= pkg.name %>-<%= grunt.template.today("yyyy-mm-dd")%>.zip'
				},
				expand: true,
				cwd: 'dist/',
				src: ['**/*'],
				dest: ''
			}
		},

	});

	grunt.registerTask('live', ['connect', 'watch']);

	grunt.registerTask('default', ['clean', 'copy:build','concat', 'cssmin', 'uglify', 'imagemin', "usemin"]);

	grunt.registerTask('build', ['clean', 'copy:build','concat', 'cssmin', 'uglify', 'imagemin', "usemin",'compress']);

	// grunt.registerTask('wc', ['watch:html', 'watch:js']);

	// grunt.registerTask('default', []);
	// grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
};