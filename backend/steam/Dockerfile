FROM openjdk:17-jdk

WORKDIR /app
COPY build/libs/steam-0.0.1-SNAPSHOT.jar steam-backend.jar
EXPOSE 8080
CMD ["java", "-jar", "-Dspring.profiles.active=dev", "steam-backend.jar"]