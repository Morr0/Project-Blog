<template>
  <div class="">
      <v-app-bar>
          <v-toolbar-title>
              <v-btn text x-large href="/">Rami Hikmat</v-btn>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                v-bind="attrs"
                v-on="on"
                text
                >
                Apps
                </v-btn>
              </template>
              <v-list column>
                  <v-list-item>
                      <v-btn text href="https://morr0.github.io/Pomodoro-Timer/" target="_blank">
                          Pomodoro Timer
                      </v-btn>
                  </v-list-item>
                  <v-list-item>
                      <v-btn text href="https://morr0.github.io/Rosary-Prayer-Counter/" target="_blank">
                          Rosary Prayer
                      </v-btn>
                  </v-list-item>
                  <v-list-item>
                      <v-btn text href="https://play.google.com/store/apps/details?id=com.project.utilitarian&hl=en_US" target="_blank">
                          Project Utility
                      </v-btn>
                  </v-list-item>
                  <v-list-item>
                      <v-btn text href="https://play.google.com/store/apps/details?id=rami.project.orange&hl=en_US" target="_blank">
                          Cram List
                      </v-btn>
                  </v-list-item>
              </v-list>
          </v-menu>


          <v-btn icon href="https://www.ramihikmat.net" target="_blank">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-btn icon href="https://www.linkedin.com/in/rami-hikmat/" target="_blank">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
          <v-btn icon href="https://github.com/Morr0" target="_blank">
            <v-icon>mdi-github</v-icon>
          </v-btn>
      </v-app-bar>
  </div>
</template>