// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
        compileSdkVersion = 34
        targetSdkVersion = 34
        minSdkVersion = 22
        androidxActivityVersion = '1.9.0'
        androidxAppCompatVersion = '1.7.0'
        androidxCoordinatorLayoutVersion = '1.2.0'
        androidxCoreVersion = '1.13.1'
        androidxFragmentVersion = '1.8.1'
        coreSplashScreenVersion = '1.0.1'
        androidxWebkitVersion = '1.11.0'
        junitVersion = '4.13.2'
        androidxJunitVersion = '1.1.5'
        androidxEspressoCoreVersion = '3.5.1'
        cordovaAndroidVersion = '10.1.1'
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.1'
        classpath 'com.google.gms:google-services:4.4.1'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

apply from: "capacitor.settings.gradle"

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
