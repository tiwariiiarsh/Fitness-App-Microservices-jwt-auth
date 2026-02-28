# Use Java 17
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy jar file
COPY target/*.jar app.jar

# Expose Eureka port
EXPOSE 8761

ENTRYPOINT ["java","-jar","app.jar"]