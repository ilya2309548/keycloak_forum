FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/forum-back-*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

EXPOSE 8081
