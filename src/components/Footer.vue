    <template>
      <div className="flex flex-wrap flex-col items-center justify-center p-2">
        <div className="flex flex-wrap items-center justify-center py-2">
          <a
            className="px-5 hover:scale-125 hover:bg-color-1 rounded-2xl"
            href="https://github.com/JayanShrestha"
            target="_blank"
          >
           <Github :size="32"/>
          </a>
          <a
            className="px-5 hover:scale-125 hover:bg-color-1 rounded-2xl"
            href="https://www.linkedin.com/in/jayan-shrestha/"
            target="_blank"
          >
            <Linkedin :size="32"/>
        
          </a>

          <a
            className="px-5 hover:scale-125 hover:bg-color-1 rounded-2xl"
            href="mailto:jayanshrestha055@gmail.com"
            target="_blank"
          >
            <Mail :size="32"/>
          </a>
        </div>
        <div>
          <p>Site is build on Vue, Chart.js, lucide-vue-next and TailwindCss</p>
        </div>
      </div>
      </template>
    <script setup>
import { Github, Linkedin, Mail } from 'lucide-vue-next';
</script>