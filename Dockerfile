FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Fix permission for Maven wrapper
RUN chmod +x mvnw

# Build the Spring Boot jar
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

# Run the EXACT jar name
CMD ["java", "-jar", "target/TodoListApk-0.0.1-SNAPSHOT.jar"]
